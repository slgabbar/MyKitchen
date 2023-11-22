using API.Dtos;
using API.Services;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Entities
{
    public class CreateRecipeCommandAsync : CommandAsync<Guid>
    {
        private readonly ApplicationDbContext _db;
        private readonly IValidator<CreateRecipeDto> _validator;
        private readonly CreateRecipeDto _createRecipeDto;

        public CreateRecipeCommandAsync(ApplicationDbContext db, IValidator<CreateRecipeDto> validator, CreateRecipeDto createRecipeDto)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
            _createRecipeDto = createRecipeDto ?? throw new ArgumentNullException(nameof(createRecipeDto));
        }

        protected override async Task<bool> VerifyPrerequisiteDataAsync() =>
            await _db.Users.AnyAsync(x => x.Id == _createRecipeDto.UserKey);

        protected override Task<bool> VerifyAccessAsync() => Task.FromResult(true);

        protected override async Task<FluentValidation.Results.ValidationResult> ValidateAsync() =>
            await _validator.ValidateAsync(_createRecipeDto);

        protected override async Task<Guid> ExecuteCommandAsync()
        {
            var user = await _db.Users
                .Where(x => x.Id == _createRecipeDto.UserKey)
                .SingleAsync();

            var recipe = new Recipe
            {
                RecipeKey = Guid.NewGuid(),
                UserKey = user.Id,
                Title = _createRecipeDto.Title!,
                Description = _createRecipeDto.Description,
                CreatedBy = user.UserName,
                CreatedOn = DateTime.Now,
                UpdatedBy = user.UserName,
                UpdatedOn = DateTime.Now,
            };

            await _db.Recipes.AddAsync(recipe);
            await _db.SaveChangesAsync();

            return recipe.RecipeKey;
        }
    }
}
