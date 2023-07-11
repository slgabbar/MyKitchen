using API.Dtos;
using API.Entities;
using API.Repositories;
using Microsoft.AspNetCore.Identity;

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

        public async Task<UserDto> LoginUser(LoginDto loginDto)
        {
            var user = await _userRepository.GetUserByEmailAsync(loginDto.Email);

            //if (user == null)
            //{
            //    ModelState.AddModelError("email", "User not found");
            //    return ValidationProblem();
            //}

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            /*if (!result)
            {
                ModelState.AddModelError("password", "Invalid password");
                return ValidationProblem();
            }*/

            return new UserDto
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePhotoUrl = user?.Avatar?.Blob?.Blob != null
                    ? $"data:{user.Avatar.ContentType};base64,{Convert.ToBase64String(user.Avatar.Blob.Blob)}"
                    : null,
                Token = await _tokenService.GenerateToken(user)
            };
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
    }
}
