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
    private readonly UserManager<User> _userManager;
    private readonly TokenService _tokenService;
    private readonly ApplicationDbContext _context;
    private readonly IUserService _userService;

    public AccountController(UserManager<User> userManager, TokenService tokenService, ApplicationDbContext context,
        IUserService userService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _context = context;
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
    public async Task<UserDto> EditAvatar([FromForm] AvatarEditDto avatarEditDto)
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);

        var currentAvatar = _context.Avatars.FirstOrDefault(x => x.UserId == user.Id);

        var removeCurrentPhoto = avatarEditDto.ClearPhotoClicked && avatarEditDto.File == null && currentAvatar != null;
        var updateCurrentAvatar = avatarEditDto.File != null && currentAvatar != null;
        string avatarBase64 = null;

        if (removeCurrentPhoto || updateCurrentAvatar)
            _context.Avatars.Remove(currentAvatar!);

        if (avatarEditDto.File != null)
        {
            var avatar = new Avatar
            {
                AvatarKey = Guid.NewGuid(),
                UserId = user.Id,
                FileName = avatarEditDto.File.FormFile.FileName,
                ContentLength = avatarEditDto.File.FormFile.Length,
                ContentType = avatarEditDto.File.FormFile.ContentType,
            };

            using (var stream = new MemoryStream())
            {
                await avatarEditDto.File.FormFile.CopyToAsync(stream);
                avatar.Blob = new AvatarBlob
                {
                    AvatarKey = avatar.AvatarKey,
                    Blob = stream.ToArray()
                };
            }

            avatarBase64 = $"data:{avatar.ContentType};base64,{Convert.ToBase64String(avatar.Blob.Blob)}";

            await _context.Avatars.AddAsync(avatar);
        }

        await _context.SaveChangesAsync();

        return new UserDto
        {
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            ProfilePhotoUrl = avatarBase64,
            Token = await _tokenService.GenerateToken(user)
        };
     }

    [Authorize]
    [HttpGet("currentUser")]
    public async Task<ActionResult<UserDto>> GetCurrentUser() =>
        await _userService.GetCurrentUserAsync(User.Identity!.Name!);
}
