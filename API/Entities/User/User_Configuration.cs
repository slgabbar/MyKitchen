using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace API.Entities
{
    public partial class ApplicationDbContext : IdentityDbContext<User, Role, Guid>
    {
    }
}
