namespace API.Dtos
{
    public class ResetPasswordRequestDto
    {
        public string Email { get; set; }
        public string ResetPasswordUrl { get; set; }
    }
}
