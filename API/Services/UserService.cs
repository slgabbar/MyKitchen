using API.Dtos;
using API.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly ApplicationDbContext _context;
        private readonly IValidator<ProfileEditDto> _profileEditValidator;
        public UserService(UserManager<User> userManager, TokenService tokenService,
            ApplicationDbContext context, IValidator<ProfileEditDto> profileEditValidator)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context;
            _profileEditValidator = profileEditValidator;
        }

        public async Task<CommandResult<UserDto>> LoginUser(LoginDto loginDto)
        {
            var user = await _context.Users
                .AsNoTracking()
                .Include(x => x.Avatar)
                .ThenInclude(x => x.Blob)
                .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null)
                return new CommandResult<UserDto>("User not found");

            if (!await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return new CommandResult<UserDto>("Invalid password");

            var userToken = await _tokenService.GenerateToken(user);
            var profilePhotoUrl = user?.Avatar?.Blob?.Blob != null
                ? $"data:{user.Avatar.ContentType};base64,{Convert.ToBase64String(user.Avatar.Blob.Blob)}"
                : null;

            var userDto = new UserDto
            {
                UserId = user!.Id,
                Email = user!.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePhotoUrl = profilePhotoUrl,
                Token = userToken
            };

            return new CommandResult<UserDto>(userDto);
        }

        public async Task<CommandResult<UserDto>> RegisterUser(RegisterDto registerDto)
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            if (user.FirstName == null || user.FirstName == "")
                return new CommandResult<UserDto>("First name is required");

            if (user.LastName == null || user.LastName == "")
                return new CommandResult<UserDto>("Last name is required");

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
                return new CommandResult<UserDto>(result.Errors.Select(x => x.Description).ToArray());

            await _userManager.AddToRoleAsync(user, "user");

            var userDto = new UserDto
            {
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = await _tokenService.GenerateToken(user)
            };

            return new CommandResult<UserDto>(userDto);
        }

        public async Task<CommandResult<bool>> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == changePasswordDto.UserId);
            if (user == null)
                return new CommandResult<bool>("Could not find user");

            if (changePasswordDto.NewPassword != changePasswordDto.ConfirmPassword)
                return new CommandResult<bool>("Passwords do not match");

            var result = await _userManager
                .ChangePasswordAsync(user, changePasswordDto.CurrentPassword, changePasswordDto.NewPassword);

            if (!result.Succeeded)
                return new CommandResult<bool>(result.Errors.Select(x => x.Description).ToArray());

            return result.Succeeded
                ? new CommandResult<bool>(true)
                : new CommandResult<bool>(result.Errors.Select(x => x.Description).ToArray());
        }

        public async Task<UserDto> GetCurrentUserAsync(string userName)
        {
            var user = await _context.Users
                .AsNoTracking()
                .Include(x => x.Avatar)
                .ThenInclude(x => x.Blob)
                .FirstOrDefaultAsync(x => x.UserName == userName);

            var userToken = await _tokenService.GenerateToken(user!);

            var avatarBase64 = user?.Avatar?.Blob?.Blob != null
                ? $"data:{user.Avatar.ContentType};base64,{Convert.ToBase64String(user.Avatar.Blob.Blob)}"
                : null;

            return new UserDto
            {
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePhotoUrl = avatarBase64,
                Token = userToken,
            };
        }

        public async Task<CommandResult<UserDto>> ProfileEdit(string userName, ProfileEditDto profileEditDto)
        {
            var validationResult = await _profileEditValidator.ValidateAsync(profileEditDto);

            if (!validationResult.IsValid)
                return new CommandResult<UserDto>(validationResult);

            var user = await _context.Users
               .Include(x => x.Avatar)
               .ThenInclude(x => x.Blob)
               .FirstAsync(x => x.UserName == userName);

            user.FirstName = profileEditDto.FirstName;
            user.LastName = profileEditDto.LastName;

            await _context.SaveChangesAsync();

            var userToken = await _tokenService.GenerateToken(user);
            var profilePhotoUrl = user?.Avatar?.Blob?.Blob != null
                ? $"data:{user.Avatar.ContentType};base64,{Convert.ToBase64String(user.Avatar.Blob.Blob)}"
                : null;

            var userDto = new UserDto
            {
                UserId = user.Id,
                Email = user!.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePhotoUrl = profilePhotoUrl,
                Token = userToken
            };

            return new CommandResult<UserDto>(userDto);
        }

        public async Task<CommandResult<UserDto>> AvatarEdit(string userName, AvatarEditDto avatarEditDto)
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

            var profilePhotoUrl = user?.Avatar?.Blob?.Blob != null
                    ? $"data:{user.Avatar.ContentType};base64,{Convert.ToBase64String(user.Avatar.Blob.Blob)}"
                    : null;

            var userDto = new UserDto
            {
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePhotoUrl = profilePhotoUrl,
                Token = await _tokenService.GenerateToken(user)
            };

            return new CommandResult<UserDto>(userDto);
        }
    }
}
