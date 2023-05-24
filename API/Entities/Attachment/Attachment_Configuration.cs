using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace API.Entities
{
    public partial class ApplicationDbContext : IdentityDbContext<User, Role, Guid>
    {
        public  DbSet<Attachment> Attachments { get; set; }
    }

    public class AttachmentEntityConfiguration : IEntityTypeConfiguration<Attachment>
    {
        public void Configure(EntityTypeBuilder<Attachment> builder)
        {
            builder.ToTable("Attachment");
            
            builder.HasKey(m => m.AttachmentKey);

            builder.Property(m => m.FileName).IsRequired();
            builder.Property(m => m.FileType).IsRequired();
            builder.Property(m => m.ContentType).IsRequired();
            builder.Property(m => m.ContentLength).IsRequired();

            builder.HasOne(m => m.Blob)
                .WithOne()
                .HasForeignKey<AttachmentBlob>(m => m.AttachmentKey);
        }
    }

    public class AttachmentBlobEntityConfiguration : IEntityTypeConfiguration<AttachmentBlob>
    {
        public void Configure(EntityTypeBuilder<AttachmentBlob> builder)
        {
            builder.ToTable("AttachmentBlob");

            builder.HasKey(m => m.AttachmentKey);
            builder.Property(m => m.Blob).IsRequired();
        }
    }
}
