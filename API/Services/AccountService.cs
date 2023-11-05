using API.Dtos;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService;

        public AccountService(UserManager<User> userManager, TokenService tokenService,
            ApplicationDbContext context, IEmailService emailService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context;
            _emailService = emailService;
        }

        public async Task<CommandResult<UserDto>> LoginUser(LoginDto loginDto)
        {
            var user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null)
                return new CommandResult<UserDto>("User not found");

            if (!await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return new CommandResult<UserDto>("Invalid password");

            if (!user.EmailConfirmed)
                return new CommandResult<UserDto>("User email has not been verified");

            var userToken = await _tokenService.GenerateToken(user);

            var userDto = new UserDto
            {
                UserId = user!.Id,
                Email = user!.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = userToken,
                UserRoles = _userManager.GetRolesAsync(user!)?.Result?
                    .Select(x => x.Normalize()).ToList() ?? new List<string>()
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
                UserName = registerDto.Email,
                CreatedOn = DateTime.Now
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

        public async Task<CommandResult<bool>> ResetPasswordRequest(ResetPasswordRequestDto resetPasswordDto, HttpRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == resetPasswordDto.Email);

            if (user != null)
            {
                var passwordResetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
                passwordResetToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(passwordResetToken));
                var passwordResetUrl = $"{resetPasswordDto.ResetPasswordUrl}?email={resetPasswordDto.Email}&confirmToken={passwordResetToken}";
                var emailDto = new EmailDto
                {
                    EmailTo = resetPasswordDto.Email,
                    EmailSubject = "Reset Password",
                    EmailBody = $"Follow the link to <a href=\"{passwordResetUrl}\" target=\"_blank\">reset your password</a>"
                };

                await _emailService.SendEailAsync(emailDto);
            }

            return new CommandResult<bool>(true);
        }
        
        public async Task<CommandResult<bool>> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == resetPasswordDto.Email);

            if (user == null)
                return new CommandResult<bool>("User not found");

            if (resetPasswordDto.Password != resetPasswordDto.ConfirmPassword)
                return new CommandResult<bool>("Password's do not match");

            var token = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(resetPasswordDto.PasswordResetToken));
            var result = await _userManager.ResetPasswordAsync(user, token, resetPasswordDto.Password);

            if (!result.Succeeded)
                return new CommandResult<bool>(result.Errors.Select(x => x.Description).ToArray());

            return new CommandResult<bool>(true);
        }

        public async Task<CommandResult<bool>> ConfirmEmail(ConfirmEmailDto confirmEmailDto)
        {
            var token = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(confirmEmailDto.ConfirmToken));

            var user = _context.Users.FirstOrDefault(x => x.Id == confirmEmailDto.UserId);
            var result = await _userManager.ConfirmEmailAsync(user, token);

            return new CommandResult<bool>(result.Succeeded);
        }

        public async Task<UserDto> GetCurrentUserAsync(string userName)
        {
            var user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.UserName == userName);

            var userToken = await _tokenService.GenerateToken(user!);

            return new UserDto
            {
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = userToken,
                UserRoles = _userManager.GetRolesAsync(user!)?.Result
                    ?.Select(x => x.Normalize()).ToList() ?? new List<string>()
            };
        }
    }
}
