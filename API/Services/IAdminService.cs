using API.Dtos;

namespace API.Services
{
    public interface IAdminService
    {
        Task<IEnumerable<UserLoginDataDto>> GetUserLoginDataAsync();
    }
}
