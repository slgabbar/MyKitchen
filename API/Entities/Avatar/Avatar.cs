using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class Avatar
    {
        public Guid AvatarKey { get; set; }
        public Guid UserId { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public long ContentLength { get; set; }

        public virtual User User { get; set; }
        public virtual AvatarBlob Blob { get; set; }
    }

    public class AvatarBlob
    {
        public Guid AvatarBlobKey { get; set; }
        public Guid AvatarKey { get; set; }
        public byte[] Blob { get; set; }
        public virtual Avatar Avatar { get; set; }
    }
}
