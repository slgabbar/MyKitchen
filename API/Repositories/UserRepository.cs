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

        public async Task<User> GetUserByEmailAsync(string email) => await _context.Users
            .AsNoTracking()
            .Include(x => x.Avatar)
            .ThenInclude(x => x.Blob)
            .Where(x => x.Email == email)
            .SingleAsync();

        public async Task<User> GetUserByUserNameAsync(string userName) => await _context.Users
            .AsNoTracking()
            .Include(x => x.Avatar)
            .ThenInclude(x => x.Blob)
            .Where(x => x.UserName == userName)
            .SingleAsync();
    }
}
