namespace API.Dtos
{
    public class ConfirmEmailDto
    {
        public Guid UserId { get; set; }
        public string ConfirmToken { get; set; }
    }
}
