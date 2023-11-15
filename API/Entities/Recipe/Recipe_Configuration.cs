using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace API.Entities
{
    public partial class ApplicationDbContext : IdentityDbContext<User, Role, Guid>
    {
        public DbSet<Recipe> Recipes { get; set; }
    }

    public class RecipeEntityConfiguration : IEntityTypeConfiguration<Recipe>
    {
        public void Configure(EntityTypeBuilder<Recipe> builder)
        {
            builder.ToTable("Recipe");

            builder.HasKey(m => m.RecipeKey);

            builder.Property(m => m.Title).IsRequired().HasMaxLength(128);
            builder.Property(m => m.Description).IsRequired(false);

            builder.Property(m => m.CreatedBy).IsRequired();
            builder.Property(m => m.CreatedOn).IsRequired();
            builder.Property(m => m.UpdatedBy).IsRequired();
            builder.Property(m => m.UpdatedOn).IsRequired();
        }
    }
}
