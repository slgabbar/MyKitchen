using API.Dtos;
using API.Entities;
using API.Models;
using API.Services;
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
[Authorize(Roles = "admin")]
public class AdminController : BaseApiController
{
    private readonly IAdminService _adminService;

    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpPost("getUserLoginDataDataAsync")]
    public async Task<IEnumerable<UserLoginDataDto>> GetUserLoginDataDataAsync() =>
        await _adminService.GetUserLoginDataAsync();
}
