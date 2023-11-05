using API.Dtos;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class AdminService : IAdminService
    {
        private readonly ApplicationDbContext _context;

        public AdminService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserLoginDataDto>> GetUserLoginDataAsync()
        {
            var userDtos = await _context.Users
                .Select(x => new UserLoginDataDto
                {
                    UserId = x.Id,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Email = x.Email,
                    EmailConfirmed = x.EmailConfirmed,
                    CreatedOn = x.CreatedOn,
                }).ToListAsync();

            return userDtos;
        }
    }
}
