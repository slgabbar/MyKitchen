using API.Dtos;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : BaseApiController
{
    private readonly UserManager<User> _userManager;
    private readonly TokenService _tokenService;
    private readonly ApplicationDbContext _context;

    public AccountController(UserManager<User> userManager, TokenService tokenService, ApplicationDbContext context)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _context = context;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);

        if (user == null)
        {
            ModelState.AddModelError("email", "User not found");
            return ValidationProblem();
        }

        var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

        if (!result)
        {
            ModelState.AddModelError("password", "Invalid password");
            return ValidationProblem();
        }

        return new UserDto
        {
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Token = await _tokenService.GenerateToken(user)
        };
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        var user = new User
        {
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            Email = registerDto.Email,
            UserName = registerDto.Email
        };

        if (user.FirstName == null || user.FirstName == "")
            ModelState.AddModelError("firstname", "First name is required");

        if (user.LastName == null || user.LastName == "")
            ModelState.AddModelError("lastname", "Last name is required");

        if (!ModelState.IsValid)
            return ValidationProblem();

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem();
        }

        await _userManager.AddToRoleAsync(user, "user");

        return new UserDto
        {
            Email = user.Email,
            Token = await _tokenService.GenerateToken(user)
        };
    }

    [Authorize]
    [HttpPost("profileEdit")]
    public async Task<ActionResult<UserDto>> ProfileEdit(ProfileEditDto profileEditDto)
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (profileEditDto.FirstName == null || profileEditDto.FirstName == "")
            ModelState.AddModelError("firstname", "First Name is required");

        if (profileEditDto.LastName == null || profileEditDto.LastName == "")
            ModelState.AddModelError("lastname", "Last Name is required");

        if (!ModelState.IsValid)
            return ValidationProblem();

        var userToUpdate = _context.Users.Single(x => x.Id == user.Id);

        userToUpdate.FirstName = profileEditDto.FirstName;
        userToUpdate.LastName = profileEditDto.LastName;

        _context.SaveChanges();

        return new UserDto
        {
            Email = userToUpdate.Email,
            FirstName = userToUpdate.FirstName,
            LastName = userToUpdate.LastName,
            Token = await _tokenService.GenerateToken(userToUpdate)
        };
    }

    [Authorize]
    [HttpGet("currentUser")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        return new UserDto
        {
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Token = await _tokenService.GenerateToken(user)
        };
    }
}
