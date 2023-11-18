using API.Dtos;
using API.Entities;
using API.Models;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(Roles = "User")]
public class RecipeController : BaseApiController
{
    private readonly ApplicationDbContext _db;
    private readonly IValidator<CreateRecipeDto> _validator;

    public RecipeController(ApplicationDbContext db, IValidator<CreateRecipeDto> validator)
    {
        _db = db;
        _validator = validator;
    }

    [HttpGet("getUserRecipes")]
    public async Task<ActionResult<IEnumerable<RecipeBasicInfoDto>>> Get() =>
       await QueryResulAsync(new GetUserRecipesQuery(_db, User.Identity!.Name!));

    [HttpGet("getRecipe")]
    public async Task<ActionResult<RecipeDto>?> Get(Guid recipeKey) =>
       await QueryResulAsync(new GetRecipeQuery(_db, recipeKey));

    [HttpPost("create")]
    public async Task<ActionResult<Guid>> Create(CreateRecipeDto createRecipeDto) =>
        await CommandResultAsync(new CreateRecipeCommandAsync(_db, _validator, createRecipeDto));

}
