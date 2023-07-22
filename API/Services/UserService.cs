using API.Dtos;
using API.Entities;
using API.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly IUserRepository _userRepository;
        public UserService(UserManager<User> userManager, TokenService tokenService, IUserRepository userRepository)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _userRepository = userRepository;
        }

        public async Task<CommandResult<UserDto>> LoginUser(LoginDto loginDto)
        {
            var user = await _userRepository.GetUserByEmailAsync(loginDto.Email);
            if (user == null)
                return new CommandResult<UserDto>("User not found");

            if (!await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return new CommandResult<UserDto>("Invalid password");

            var userToken = await _tokenService.GenerateToken(user);
            var profilePhotoUrl = user?.Avatar?.Blob?.Blob != null
                ? $"data:{user.Avatar.ContentType};base64,{Convert.ToBase64String(user.Avatar.Blob.Blob)}"
                : null;

            var userDto = new UserDto
            {
                Email = user!.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePhotoUrl = profilePhotoUrl,
                Token = userToken
            };

            return new CommandResult<UserDto>(userDto);
        }

        public async Task<CommandResult<UserDto>> RegisterUser(RegisterDto registerDto)
        {
            var user = new User
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            if (user.FirstName == null || user.FirstName == "")
                return new CommandResult<UserDto>("First name is required");

            if (user.LastName == null || user.LastName == "")
                return new CommandResult<UserDto>("Last name is required");

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
                return new CommandResult<UserDto>(result.Errors.Select(x => x.Description).ToArray());

            await _userManager.AddToRoleAsync(user, "user");

            var userDto = new UserDto
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = await _tokenService.GenerateToken(user)
            };

            return new CommandResult<UserDto>(userDto);
        }

        public async Task<UserDto> GetCurrentUserAsync(string userName)
        {
            var user = await _userRepository.GetUserByUserNameAsync(userName);
            var userToken = await _tokenService.GenerateToken(user);

            var avatarBase64 = user?.Avatar?.Blob?.Blob != null
                ? $"data:{user.Avatar.ContentType};base64,{Convert.ToBase64String(user.Avatar.Blob.Blob)}"
                : null;

            return new UserDto
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePhotoUrl = avatarBase64,
                Token = userToken,
            };
        }

        public async Task<CommandResult<UserDto>> ProfileEdit(string userName, ProfileEditDto profileEditDto)
        {
            var commandResult = new CommandResult<UserDto>();

            if (profileEditDto.FirstName == null || profileEditDto.FirstName == "")
                commandResult.AddError("First Name is required");

            if (profileEditDto.LastName == null || profileEditDto.LastName == "")
                commandResult.AddError("Last Name is required");

            if (!commandResult.IsFailure)
            {
                var user = await _userRepository.UpdateUserProfile(userName, profileEditDto);

                var userToken = await _tokenService.GenerateToken(user);
                var profilePhotoUrl = user?.Avatar?.Blob?.Blob != null
                    ? $"data:{user.Avatar.ContentType};base64,{Convert.ToBase64String(user.Avatar.Blob.Blob)}"
                    : null;

                commandResult.SetResult(new UserDto
                {
                    Email = user!.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    ProfilePhotoUrl = profilePhotoUrl,
                    Token = userToken
                });
            }

            return commandResult;
        }
    }
}
