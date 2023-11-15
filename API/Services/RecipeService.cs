using API.Dtos;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class RecipeService : IRecipeService
    {
        private readonly ApplicationDbContext _context;

        public RecipeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CommandResult<Guid>> CreateRecipeAsync(CreateRecipeDto createRecipeDto)
        {
            if (createRecipeDto.Title == null || createRecipeDto.Title.Trim().IsNullOrEmpty())
                return new CommandResult<Guid>("Title is required");

            var user = await _context.Users
                .Where(x => x.Id == createRecipeDto.UserKey)
                .FirstOrDefaultAsync();

            if (user == null)
                return new CommandResult<Guid>("User not found");

            var recipe = new Recipe
            {
                RecipeKey = Guid.NewGuid(),
                Title = createRecipeDto.Title,
                Description = createRecipeDto.Description,
                CreatedBy = user.UserName,
                CreatedOn = DateTime.Now,
                UpdatedBy = user.UserName,
                UpdatedOn = DateTime.Now,
            };

            await _context.Recipes.AddAsync(recipe);
            await _context.SaveChangesAsync();

            return new CommandResult<Guid>(recipe.RecipeKey);
        }
    }
}
