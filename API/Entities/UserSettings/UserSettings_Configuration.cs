using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace API.Entities
{
    public partial class ApplicationDbContext : IdentityDbContext<User, Role, Guid>
    {
        public DbSet<UserSettings> UserSettings { get; set; }
    }

    public class UserSettingsEntityConfiguration : IEntityTypeConfiguration<UserSettings>
    {
        public void Configure(EntityTypeBuilder<UserSettings> builder)
        {
            builder.ToTable("UserSettings");
            builder.HasKey(m => m.UserId);
        }
    }
}
