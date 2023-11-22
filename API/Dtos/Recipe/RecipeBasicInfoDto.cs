namespace API.Dtos
{
    public class RecipeBasicInfoDto
    {
        public Guid RecipeKey { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
    }
}
