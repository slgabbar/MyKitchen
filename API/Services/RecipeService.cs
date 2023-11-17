using API.Dtos;
using API.Entities;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data.SqlTypes;

namespace API.Services
{

    public class RecipeService : IRecipeService
    {
        private readonly ApplicationDbContext _context;

        public RecipeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RecipeBasicInfoDto>> GetUserRecipesAsync(string userName)
        {
            var userKey = await _context.Users
                .Where(x => x.UserName == userName)
                .Select(x => x.Id)
                .SingleAsync();

            return await _context.Recipes
                .Where(x => x.UserKey == userKey)
                .Select(x => new RecipeBasicInfoDto
                {
                    Title = x.Title,
                    Description = x.Description,
                }).ToListAsync();
        }
    }
}
