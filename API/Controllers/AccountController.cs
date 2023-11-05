using API.Dtos;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : BaseApiController
{
    private readonly IAccountService _accountService;
    
    public AccountController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) =>
        CommandResult(await _accountService.LoginUser(loginDto));

    [HttpPost("register")]
    public async Task<ActionResult<bool>> Register(RegisterDto registerDto) =>
        CommandResult(await _accountService.RegisterUser(registerDto, Request));

    [HttpPost("resetPasswordRequest")]
    public async Task<ActionResult<bool>> ResetPasswordRequest(ResetPasswordRequestDto resetPasswordRequestDto) =>
        CommandResult(await _accountService.ResetPasswordRequest(resetPasswordRequestDto, Request));

    [HttpPost("resetPassword")]
    public async Task<ActionResult<bool>> ResetPassword(ResetPasswordDto resetPasswordDto) =>
     CommandResult(await _accountService.ResetPassword(resetPasswordDto));

    [HttpPost("confirmEmail")]
    public async Task<ActionResult<bool>> ConfirmEmail(ConfirmEmailDto confirmEmailDto) =>
        CommandResult(await _accountService.ConfirmEmail(confirmEmailDto));

    [Authorize]
    [HttpGet("currentUser")]
    public async Task<ActionResult<UserDto>> GetCurrentUser() =>
        await _accountService.GetCurrentUserAsync(User.Identity!.Name!);
}
