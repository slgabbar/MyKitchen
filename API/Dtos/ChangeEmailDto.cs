namespace API.Dtos
{
    public class ChangeEmailDto
    {
        public Guid UserId { get; set; }
        public string Email { get; set; }
    }
}
