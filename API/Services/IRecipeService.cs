using API.Dtos;

namespace API.Services
{
    public interface IRecipeService
    {
        Task<CommandResult<Guid>> CreateRecipeAsync(CreateRecipeDto createRecipeDto);
    }
}
