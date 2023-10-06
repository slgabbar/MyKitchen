using API.Dtos;

namespace API.Services
{
    public interface IEmailService
    {
        Task SendEailAsync(EmailDto request);
    }
}
