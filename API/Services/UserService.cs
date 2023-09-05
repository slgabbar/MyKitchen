using API.Dtos;
using API.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly ApplicationDbContext _context;
        private readonly IValidator<ProfileEditDto> _profileEditValidator;
        private readonly IEmailService _emailService;
        public UserService(UserManager<User> userManager, TokenService tokenService,
            ApplicationDbContext context, IValidator<ProfileEditDto> profileEditValidator,
            IEmailService emailService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context;
            _profileEditValidator = profileEditValidator;
            _emailService = emailService;
        }

        public async Task<CommandResult<UserDto>> LoginUser(LoginDto loginDto)
        {
            var user = await _context.Users
                .AsNoTracking()
                .Include(x => x.Avatar)
                .ThenInclude(x => x.Blob)
                .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

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
                UserId = user!.Id,
                Email = user!.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePhotoUrl = profilePhotoUrl,
                Token = userToken
            };

            var mailDto = new EmailDto
            {
                EmailTo = user.Email,
                EmailSubject = "Log-In",
                EmailBody = "Thanks for loggin in bro"
            };

            await _emailService.SendEailAsync(mailDto);

            return new CommandResult<UserDto>(userDto);
        }

        public async Task<CommandResult<bool>> RegisterUser(RegisterDto registerDto, HttpRequest request)
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            if (user.FirstName == null || user.FirstName == "")
                return new CommandResult<bool>("First name is required");

            if (user.LastName == null || user.LastName == "")
                return new CommandResult<bool>("Last name is required");

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
                return new CommandResult<bool>(result.Errors.Select(x => x.Description).ToArray());

            await _userManager.AddToRoleAsync(user, "user");
            
            if (!registerDto.AccountConfirmationUrl.IsNullOrEmpty())
            {
                var emailConfirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                emailConfirmationToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(emailConfirmationToken));
                var emailConfirmationUrl = $"{registerDto.AccountConfirmationUrl}?userId={user.Id}&confirmToken={emailConfirmationToken}";
                var emailDto = new EmailDto
                {
                    EmailTo = registerDto.Email,
                    EmailSubject = "Confirm Email",
                    EmailBody = $"Thanks for registering, please <a href=\"{emailConfirmationUrl}\" target=\"_blank\">confirm your account</a>"
                };

                await _emailService.SendEailAsync(emailDto);
            }

            return new CommandResult<bool>(true);
        }

        public async Task<CommandResult<bool>> ConfirmEmailDto(ConfirmEmailDto confirmEmailDto)
        {
            var token = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(confirmEmailDto.ConfirmToken));

            var user = _context.Users.FirstOrDefault(x => x.Id == confirmEmailDto.UserId);
            var result = await _userManager.ConfirmEmailAsync(user, token);

            return new CommandResult<bool>(result.Succeeded);
        }

        public async Task<CommandResult<bool>> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == changePasswordDto.UserId);
            if (user == null)
                return new CommandResult<bool>("Could not find user");

            if (changePasswordDto.NewPassword != changePasswordDto.ConfirmPassword)
                return new CommandResult<bool>("Passwords do not match");

            var result = await _userManager
                .ChangePasswordAsync(user, changePasswordDto.CurrentPassword, changePasswordDto.NewPassword);

            if (!result.Succeeded)
                return new CommandResult<bool>(result.Errors.Select(x => x.Description).ToArray());

            return result.Succeeded
                ? new CommandResult<bool>(true)
                : new CommandResult<bool>(result.Errors.Select(x => x.Description).ToArray());
        }

        public async Task<CommandResult<UserDto>> ChangeEmail(ChangeEmailDto changeEmailDto)
        {
            var user = _context.Users
                .Include(x => x.Avatar)
                .ThenInclude(x => x.Blob)
                .FirstOrDefault(x => x.Id == changeEmailDto.UserId);

            if (user == null)
                return new CommandResult<UserDto>("Could not find user");

            if (changeEmailDto.Email.IsNullOrEmpty())
                return new CommandResult<UserDto>("Email is required");

            if (user.Email != changeEmailDto.Email)
            {
                var result = await _userManager.SetEmailAsync(user, changeEmailDto.Email);

                if (!result.Succeeded)
                    return new CommandResult<UserDto>(result.Errors.Select(x => x.Description).ToArray());
            }

            var userToken = await _tokenService.GenerateToken(user);
            var profilePhotoUrl = user?.Avatar?.Blob?.Blob != null
                ? $"data:{user.Avatar.ContentType};base64,{Convert.ToBase64String(user.Avatar.Blob.Blob)}"
                : null;

            var userDto = new UserDto
            {
                UserId = user!.Id,
                Email = changeEmailDto.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePhotoUrl = profilePhotoUrl,
                Token = userToken
            };

            return new CommandResult<UserDto>(userDto);
        }

        public async Task<UserDto> GetCurrentUserAsync(string userName)
        {
            var user = await _context.Users
                .AsNoTracking()
                .Include(x => x.Avatar)
                .ThenInclude(x => x.Blob)
                .FirstOrDefaultAsync(x => x.UserName == userName);

            var userToken = await _tokenService.GenerateToken(user!);

            var avatarBase64 = user?.Avatar?.Blob?.Blob != null
                ? $"data:{user.Avatar.ContentType};base64,{Convert.ToBase64String(user.Avatar.Blob.Blob)}"
                : null;

            return new UserDto
            {
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePhotoUrl = avatarBase64,
                Token = userToken,
            };
        }

        public async Task<CommandResult<UserDto>> ProfileEdit(string userName, ProfileEditDto profileEditDto)
        {
            var validationResult = await _profileEditValidator.ValidateAsync(profileEditDto);

            if (!validationResult.IsValid)
                return new CommandResult<UserDto>(validationResult);

            var user = await _context.Users
               .Include(x => x.Avatar)
               .ThenInclude(x => x.Blob)
               .FirstAsync(x => x.UserName == userName);

            user.FirstName = profileEditDto.FirstName;
            user.LastName = profileEditDto.LastName;

            await _context.SaveChangesAsync();

            var userToken = await _tokenService.GenerateToken(user);
            var profilePhotoUrl = user?.Avatar?.Blob?.Blob != null
                ? $"data:{user.Avatar.ContentType};base64,{Convert.ToBase64String(user.Avatar.Blob.Blob)}"
                : null;

            var userDto = new UserDto
            {
                UserId = user.Id,
                Email = user!.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePhotoUrl = profilePhotoUrl,
                Token = userToken
            };

            return new CommandResult<UserDto>(userDto);
        }

        public async Task<CommandResult<UserDto>> AvatarEdit(string userName, AvatarEditDto avatarEditDto)
        {
            var user = await _context.Users
                .AsNoTracking()
                .SingleAsync(x => x.UserName == userName);

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

                user.Avatar = avatar;

                await _context.Avatars.AddAsync(avatar);
            }

            await _context.SaveChangesAsync();

            var profilePhotoUrl = user?.Avatar?.Blob?.Blob != null
                    ? $"data:{user.Avatar.ContentType};base64,{Convert.ToBase64String(user.Avatar.Blob.Blob)}"
                    : null;

            var userDto = new UserDto
            {
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePhotoUrl = profilePhotoUrl,
                Token = await _tokenService.GenerateToken(user)
            };

            return new CommandResult<UserDto>(userDto);
        }
    }
}
