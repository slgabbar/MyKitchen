using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class UserSettings 
    {
        public Guid UserId { get; set; }
        public Guid? AvatarAttachmentKey { get; set; }
        public virtual Attachment Avatar { get; set; }
    }
}
