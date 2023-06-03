using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace API.Entities
{
    public partial class ApplicationDbContext : IdentityDbContext<User, Role, Guid>
    {
        public  DbSet<Avatar> Avatars { get; set; }
    }

    public class AvatarEntityConfiguration : IEntityTypeConfiguration<Avatar>
    {
        public void Configure(EntityTypeBuilder<Avatar> builder)
        {
            builder.ToTable("Avatar");
            
            builder.HasKey(m => m.AvatarKey);

            builder.Property(m => m.UserId).IsRequired();
            builder.Property(m => m.FileName).IsRequired();
            builder.Property(m => m.ContentType).IsRequired();
            builder.Property(m => m.ContentLength).IsRequired();

            builder.HasOne(m => m.Blob)
                .WithOne(m => m.Avatar)
                .HasForeignKey<AvatarBlob>(m => m.AvatarKey)
                .IsRequired(true);
        }
    }

    public class AvatarBlobEntityConfiguration : IEntityTypeConfiguration<AvatarBlob>
    {
        public void Configure(EntityTypeBuilder<AvatarBlob> builder)
        {
            builder.ToTable("AvatarBlob");

            builder.HasKey(m => m.AvatarBlobKey);
            builder.Property(m => m.AvatarKey).IsRequired();
            builder.Property(m => m.Blob).IsRequired();
        }
    }
}
