using API.Dtos;
using API.Entities;
using API.Models;
using API.Services;
using FluentValidation;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using MimeKit;
using System.IO;
using System.IO.Compression;
using System.Linq.Expressions;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(Roles = "User")]
public class RecipeController : BaseApiController
{
    private readonly IRecipeService _recipeService;
    private readonly ApplicationDbContext _db;
    private readonly IValidator<CreateRecipeDto> _validator;

    public RecipeController(IRecipeService recipeService, ApplicationDbContext db, IValidator<CreateRecipeDto> validator)
    {
        _recipeService = recipeService;
        _db = db;
        _validator = validator;
    }

    [HttpGet("getUserRecipes")]
    public async Task<IEnumerable<RecipeBasicInfoDto>> Get() =>
       await _recipeService.GetUserRecipesAsync(User.Identity!.Name!);

    [HttpGet("getRecipe")]
    public async Task<RecipeDto?> Get(Guid recipeKey) =>
        await _recipeService.GetRecipeAsync(recipeKey);

    [HttpPost("create")]
    public async Task<ActionResult<Guid>> Create(CreateRecipeDto createRecipeDto) =>
        await CommandResultAsync(new CreateRecipeCommandAsync(_db, _validator, createRecipeDto));

}
