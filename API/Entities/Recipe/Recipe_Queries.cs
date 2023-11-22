using API.Dtos;
using API.Services;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace API.Entities
{
    public class GetRecipeQuery : QuerySingleAsync<RecipeDto>
    {
        private readonly ApplicationDbContext _db;
        private readonly Guid _recipeKey;

        public GetRecipeQuery(ApplicationDbContext db, Guid recipeKey)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
            _recipeKey = recipeKey;
        }

        protected override async Task<bool> VerifyPrerequisiteDataAsync() =>
            await _db.Recipes.AnyAsync(x => x.RecipeKey == _recipeKey);

        protected override Task<bool> VerifyAccessAsync() => Task.FromResult(true);

        protected override async Task<RecipeDto> ExecuteQueryAsync()
        {
            return await _db.Recipes
                .Where(x => x.RecipeKey == _recipeKey)
                .Select(x => new RecipeDto
                {
                    RecipeKey = x.RecipeKey,
                    Title = x.Title,
                    Description = x.Description,
                }).SingleAsync();
        }
    }

    public class GetUserRecipesQuery : QueryMultipleAsync<RecipeBasicInfoDto>
    {
        private readonly ApplicationDbContext _db;
        private readonly string _userName;

        public GetUserRecipesQuery(ApplicationDbContext db, string userName)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
            _userName = userName;
        }

        protected override async Task<bool> VerifyPrerequisiteDataAsync() =>
            await _db.Users.AnyAsync(x => x.UserName == _userName);

        protected override Task<bool> VerifyAccessAsync() => Task.FromResult(true);

        protected override async Task<IEnumerable<RecipeBasicInfoDto>> ExecuteQueryAsync()
        {
            var userKey = await _db.Users
                .AsNoTracking()
                .Where(x => x.UserName == _userName)
                .Select(x => x.Id)
                .SingleAsync();

            return await _db.Recipes
                .Where(x => x.UserKey == userKey)
                .Select(x => new RecipeBasicInfoDto
                {
                    RecipeKey = x.RecipeKey,
                    Title = x.Title,
                    Description = x.Description,
                }).ToListAsync();
        }
    }
}
