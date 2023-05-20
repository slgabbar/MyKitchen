using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class Attachment
    {
        public Guid AttachmentKey { get; set; }     
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public long ContentLength { get; set; }

        public virtual AttachmentBlob Blob { get; set; }
    }

    public class AttachmentBlob
    {
        public Guid AttachmentKey { get; set; }
        public byte[] Blob { get; set; }
    }

}
