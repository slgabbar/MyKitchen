using API.Dtos;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        public ActionResult<T> CommandResult<T>(CommandResult<T> command)
        {
            if (command.IsFailure)
            {
                command.ErrorMessages?.ForEach(error =>
                {
                    ModelState.AddModelError("", error);
                });

                command.ValidationResult?.Errors?.ForEach(error =>
                {
                    ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
                });

                return ValidationProblem();
            }

            return Ok(command.Result);
        }
    }
}