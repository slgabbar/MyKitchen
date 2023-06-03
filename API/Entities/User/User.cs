using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual Avatar Avatar { get; set; }
    }
}
