﻿using API.Dtos;

namespace API.Services
{
    public interface IUserService
    {
        Task<CommandResult<UserDto>> LoginUser(LoginDto loginDto);
        
        Task<CommandResult<UserDto>> RegisterUser(RegisterDto registerDto, HttpRequest request);

        Task<CommandResult<bool>> ConfirmEmailDto(ConfirmEmailDto confirmEmailDto);

        Task<CommandResult<bool>> ChangePassword(ChangePasswordDto changePasswordDto);
        
        Task<CommandResult<UserDto>> ChangeEmail(ChangeEmailDto changeEmailDto);

        Task<CommandResult<UserDto>> ProfileEdit(string userName, ProfileEditDto profileEditDto);

        Task<CommandResult<UserDto>> AvatarEdit(string userName, AvatarEditDto avatarEditDto);

        Task<UserDto> GetCurrentUserAsync(string userName);
    }
}
