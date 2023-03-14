namespace API.Dtos
{
    public class RegisterDto : LoginDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
