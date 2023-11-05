using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace API.Entities
{
    public partial class ApplicationDbContext : IdentityDbContext<User, Role, Guid>
    {
        public class UserEntityConfiguration : IEntityTypeConfiguration<User>
        {
            public void Configure(EntityTypeBuilder<User> builder)
            {
                builder.Property(m => m.FirstName).IsRequired(true);
                builder.Property(m => m.LastName).IsRequired(true);
                builder.Property(m => m.CreatedOn).IsRequired(true);
            }
        }
    }
}
