namespace API.Dtos
{
    public class CreateRecipeDto
    {
        public Guid UserKey { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
    }
}
