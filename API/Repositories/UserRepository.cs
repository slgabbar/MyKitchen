using API.Dtos;
using API.Entities;
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
    }
}
