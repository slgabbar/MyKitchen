using API.Dtos;

namespace API.Services
{
    public interface IUserService
    {
        Task<CommandResult<UserDto>> LoginUser(LoginDto loginDto);
        
        Task<CommandResult<UserDto>> RegisterUser(RegisterDto registerDto);

        Task<CommandResult<UserDto>> ProfileEdit(string userName, ProfileEditDto profileEditDto);
        
        Task<UserDto> GetCurrentUserAsync(string userName);
    }
}
