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
                command.ValidationResult?.Errors?.ForEach(error =>
                {
                    ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
                });

                return ValidationProblem();
            }

            return Ok(command.Result);
        }

        protected async Task<ActionResult<T>> CommandResultAsync<T>(CommandAsync<T> command)
        {
            var commandResult = await command.ExecuteAsync();

            if (!commandResult.PrerequisiteDataFound)
            {
                return NotFound();
            }

            if (!commandResult.CanAccess)
            {
                return Unauthorized();
            }

            if (commandResult.IsFailure)
            {
                commandResult.ValidationResult?.Errors?.ForEach(error =>
                {
                    ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
                });

                return ValidationProblem();
            }

            return Ok(commandResult);
        }
    }
}