using API.Dtos;
using API.Entities;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class RecipeService : IRecipeService
    {
        private readonly ApplicationDbContext _context;
        private readonly IValidator<CreateRecipeDto> _createRecipeValidator;

        public RecipeService(ApplicationDbContext context, IValidator<CreateRecipeDto> createRecipeValidator)
        {
            _context = context;
            _createRecipeValidator = createRecipeValidator;
        }

        public async Task<CommandResult<Guid>> CreateRecipeAsync(CreateRecipeDto createRecipeDto)
        {
            var validationResult = await _createRecipeValidator.ValidateAsync(createRecipeDto);

            if (!validationResult.IsValid)
            {
                return new CommandResult<Guid>(validationResult);
            }

            var user = await _context.Users
                .Where(x => x.Id == createRecipeDto.UserKey)
                .FirstOrDefaultAsync();
            
            if (user == null)
                return new CommandResult<Guid>("User not found");

            var recipe = new Recipe
            {
                RecipeKey = Guid.NewGuid(),
                UserKey = user.Id,
                Title = createRecipeDto.Title!,
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
