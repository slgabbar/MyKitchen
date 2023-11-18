using API.Dtos;

namespace API.Services
{
    public interface IRecipeService
    {
        Task<RecipeDto?> GetRecipeAsync(Guid recipeKey);

        Task<IEnumerable<RecipeBasicInfoDto>> GetUserRecipesAsync(string userName);
    }
}
