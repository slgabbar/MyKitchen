namespace API.Dtos
{
    public class UserLoginDataDto
    {
        public Guid UserId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public bool EmailConfirmed { get; set; }
        public string EmailConfirmedDisplay => EmailConfirmed ? "Yes" : "No";
        public DateTime CreatedOn { get; set; }
        public string CreatedOnSort => CreatedOn.ToString("o");
        public string CreatedOnDisplay => $"{CreatedOn.ToShortDateString()} {CreatedOn.ToShortTimeString()}";

    }
}
