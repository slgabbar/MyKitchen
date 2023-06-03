using Microsoft.AspNetCore.Mvc;

namespace API.Dtos
{
    public class UserDto
    {
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? ProfilePhotoUrl { get; set; }
        public string Token { get; set; } = null!;
    }
}
