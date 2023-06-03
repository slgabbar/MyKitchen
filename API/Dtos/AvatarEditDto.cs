using API.Models;

namespace API.Dtos
{
    public class AvatarEditDto
    {
        public FileModel? File { get; set; }
        public bool ClearPhotoClicked { get; set; }
    }
}
