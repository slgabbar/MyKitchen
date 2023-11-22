using API.Dtos;
using FluentValidation;

namespace API.Entities
{
    public class CreateRecipeValidator: AbstractValidator<CreateRecipeDto>
    {
        public CreateRecipeValidator()
        {
            RuleFor(m => m.Title).NotEmpty().WithMessage("Title is required");
        }
    }
}
