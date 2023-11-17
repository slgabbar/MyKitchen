using API.Dtos;

namespace API.Services
{
    public interface IRecipeService
    {
        Task<IEnumerable<RecipeBasicInfoDto>> GetUserRecipesAsync(string userName);
    }
}
