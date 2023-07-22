using API.Dtos;
using API.Services;
using Microsoft.AspNetCore.Mvc;

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

                return ValidationProblem();
            }

            return Ok(command.Result);
        }
    }
}