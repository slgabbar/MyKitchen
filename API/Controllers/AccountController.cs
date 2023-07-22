using API.Dtos;
using API.Entities;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.IO;
using System.IO.Compression;
using System.Linq.Expressions;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : BaseApiController
{
    private readonly IUserService _userService;

    public AccountController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) =>
        CommandResult(await _userService.LoginUser(loginDto));

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) =>
        CommandResult(await _userService.RegisterUser(registerDto));

    [Authorize]
    [HttpPost("profileEdit")]
    public async Task<ActionResult<UserDto>> ProfileEdit(ProfileEditDto profileEditDto) =>
        CommandResult(await _userService.ProfileEdit(User.Identity!.Name!, profileEditDto));

    [Authorize]
    [HttpPost("avatarEdit")]
    public async Task<ActionResult<UserDto>> EditAvatar([FromForm] AvatarEditDto avatarEditDto) =>
        CommandResult(await _userService.AvatarEdit(User.Identity!.Name!, avatarEditDto));

    [Authorize]
    [HttpGet("currentUser")]
    public async Task<ActionResult<UserDto>> GetCurrentUser() =>
        await _userService.GetCurrentUserAsync(User.Identity!.Name!);
}
