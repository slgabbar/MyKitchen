using API.Dtos;
using API.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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
                    EmailConfirmed = x.EmailConfirmed ? "Yes" : "No"
                }).ToListAsync();

            return userDtos;
        }
    }
}
