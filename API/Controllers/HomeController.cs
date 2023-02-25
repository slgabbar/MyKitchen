using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController : ControllerBase
{
    public HomeController()
    {
    }

    [HttpGet(Name = "Home")]
    public string Get()
    {
        return "Hello, World!!!";
    }
}
