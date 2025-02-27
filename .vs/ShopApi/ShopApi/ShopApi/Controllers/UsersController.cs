using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopApi.Models;
using ShopApi.Services;
using ShopApi.Types;
using System.Security.Claims;

namespace ShopApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly TokenService _tokenService;
        private readonly UserService _userService;

        // Inject the UserService to interact with the business logic
      
        private readonly ILogger<UsersController> _logger;

        public UsersController(ILogger<UsersController> logger, UserService userService, TokenService tokenService)
        {
            _logger = logger;
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await this._userService.GetAllUsersAsync(); 

            return Ok(users); 
        }

        [HttpGet("login/{id}")]
        [AllowAnonymous] 
        public async Task<IActionResult> UserLogin(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }

            var token = this._tokenService.GenerateUserToken(user);

            return Ok(new { token });
        }

        [HttpPost]
        public async Task<IActionResult> SaveUser([FromBody] User userToSave)
        {
            try
            {
                var savedUser = await _userService.SaveUser(userToSave);

                return CreatedAtAction(nameof(SaveUser), new { id = savedUser.Id }, savedUser);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("current/role")]
        [Authorize] 
        public ActionResult<string> GetCurrentUserRole()
        {
            var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

            if (userRole == null)
            {
                return Unauthorized("User role not found.");
            }

            return Ok(new { userRole });
        }
    }
}