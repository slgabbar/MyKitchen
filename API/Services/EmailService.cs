using API.Dtos;
using MailKit.Net.Smtp;
using MimeKit;

namespace API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        
        public EmailService(IConfiguration config)
        {
            _config = config;   
        }

        public async Task SendEailAsync(EmailDto request)
        {
            var email = new MimeMessage();

            email.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUserName").Value));
            email.To.Add(MailboxAddress.Parse(request.EmailTo));
            email.Subject = request.EmailSubject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = request.EmailBody };

            using var smtp = new SmtpClient();

            await smtp.ConnectAsync(_config.GetSection("EmailHost").Value, 587, MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_config.GetSection("EmailUserName").Value, _config.GetSection("EmailPassword").Value);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}
