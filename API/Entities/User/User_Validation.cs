using API.Dtos;
using FluentValidation;

namespace API.Entities
{
    public class UserProfileEditValidator : AbstractValidator<ProfileEditDto>
    {
        public UserProfileEditValidator()
        {
            RuleFor(m => m.FirstName).NotEmpty().WithMessage("First Name is required");
            RuleFor(m => m.LastName).NotEmpty().WithMessage("First Name is required");
        }
    }
}
