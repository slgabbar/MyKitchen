using API.Dtos;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<User?> GetUserByEmailAsync(string email) => await _context.Users
            .AsNoTracking()
            .Include(x => x.Avatar)
            .ThenInclude(x => x.Blob)
            .Where(x => x.Email == email)
            .SingleOrDefaultAsync();

        public async Task<User?> GetUserByUserNameAsync(string userName) => await _context.Users
            .AsNoTracking()
            .Include(x => x.Avatar)
            .ThenInclude(x => x.Blob)
            .Where(x => x.UserName == userName)
            .SingleOrDefaultAsync();


        public async Task<User> UpdateUserProfile(string userName, ProfileEditDto profileEditDto)
        {
            var user = await _context.Users
                .Include(x => x.Avatar)
                .ThenInclude(x => x.Blob)
                .FirstAsync(x => x.UserName == userName);

            user.FirstName = profileEditDto.FirstName;
            user.LastName = profileEditDto.LastName;

            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User> UpdateAvatar(string userName, AvatarEditDto avatarEditDto)
        {
            var user = await _context.Users
                .AsNoTracking()
                .SingleAsync(x => x.UserName == userName);

            var currentAvatar = _context.Avatars.FirstOrDefault(x => x.UserId == user.Id);

            var removeCurrentPhoto = avatarEditDto.ClearPhotoClicked && avatarEditDto.File == null && currentAvatar != null;
            var updateCurrentAvatar = avatarEditDto.File != null && currentAvatar != null;
            string avatarBase64 = null;

            if (removeCurrentPhoto || updateCurrentAvatar)
                _context.Avatars.Remove(currentAvatar!);

            if (avatarEditDto.File != null)
            {
                var avatar = new Avatar
                {
                    AvatarKey = Guid.NewGuid(),
                    UserId = user.Id,
                    FileName = avatarEditDto.File.FormFile.FileName,
                    ContentLength = avatarEditDto.File.FormFile.Length,
                    ContentType = avatarEditDto.File.FormFile.ContentType,
                };

                using (var stream = new MemoryStream())
                {
                    await avatarEditDto.File.FormFile.CopyToAsync(stream);
                    avatar.Blob = new AvatarBlob
                    {
                        AvatarKey = avatar.AvatarKey,
                        Blob = stream.ToArray()
                    };
                }

                avatarBase64 = $"data:{avatar.ContentType};base64,{Convert.ToBase64String(avatar.Blob.Blob)}";

                user.Avatar = avatar;

                await _context.Avatars.AddAsync(avatar);
            }

            await _context.SaveChangesAsync();

            return user;
        }
    }

}
