using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class Recipe
    {
        public Guid RecipeKey { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public string UpdatedBy { get; set; } = null!;
        public DateTime UpdatedOn { get; set; }
    }
}
