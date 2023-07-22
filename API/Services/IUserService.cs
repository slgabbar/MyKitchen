using API.Dtos;

namespace API.Services
{
    public interface IUserService
    {
        Task<CommandResult<UserDto>> LoginUser(LoginDto loginDto);
        Task<CommandResult<UserDto>> RegisterUser(RegisterDto registerDto);
        Task<UserDto> GetCurrentUserAsync(string userName);
    }
}
