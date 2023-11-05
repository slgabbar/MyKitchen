using API.Dtos;

namespace API.Services
{
    public interface IAccountService
    {
        Task<CommandResult<UserDto>> LoginUser(LoginDto loginDto);
        
        Task<CommandResult<bool>> RegisterUser(RegisterDto registerDto, HttpRequest request);

        Task<CommandResult<bool>> ResetPasswordRequest(ResetPasswordRequestDto resetPasswordRequestDto, HttpRequest request);
        
        Task<CommandResult<bool>> ResetPassword(ResetPasswordDto resetPasswordDto);

        Task<CommandResult<bool>> ConfirmEmail(ConfirmEmailDto confirmEmailDto);

        Task<UserDto> GetCurrentUserAsync(string userName);
    }
}
