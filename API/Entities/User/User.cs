using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
    }
}
