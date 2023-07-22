using API.Dtos;
using API.Entities;

namespace API.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmailAsync(string email);
        Task<User?> GetUserByUserNameAsync(string userName);
        Task<User> UpdateUserProfile(string userName, ProfileEditDto profileEditDto);
    }
}
