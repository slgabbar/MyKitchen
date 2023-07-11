using API.Dtos;

namespace API.Services
{
    public interface IUserService
    {
        Task<UserDto> LoginUser(LoginDto loginDto);
        Task<UserDto> GetCurrentUserAsync(string userName);
    }
}
