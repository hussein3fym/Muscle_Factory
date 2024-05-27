using Backend_APIs.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using User.Management.Service.Models;
using User.Management.Service.Services;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using User.Management.Services.Services;

namespace Backend_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<Backend_APIs.Models.User> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;


        public AuthenticationController(UserManager<Backend_APIs.Models.User> userManager,
            RoleManager<IdentityRole<int>> roleManager, IConfiguration configuration, IEmailService emailService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _emailService = emailService;
        }
        [HttpPost]
        public async Task<IActionResult> Register([FromForm] UserDTO dto, string role)
        {

            // First check user existence
            var userExist = await _userManager.FindByEmailAsync(dto.Email);
            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = "User Already Exist !" });
            }

            // Add user to database 
            Backend_APIs.Models.User user = new()
            {
                Email = dto.Email,
                UserName = dto.UserName,
            };
            if (await _roleManager.RoleExistsAsync(role))
            {
                var result = await _userManager.CreateAsync(user, dto.Password);

                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = "Failed to create User !" });
                }
                //add role to the user if the role exist 
                await _userManager.AddToRoleAsync(user, role);

                //add token to verify email
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmationLink = Url.Action(nameof(ConfirmEmail), "Authentication", new { token, email = dto.Email }, Request.Scheme);
                var message = new Message(new string[] { dto.Email! }, "Verify Your Email From Here ", confirmationLink);
                _emailService.SendEmail(message);

                return StatusCode(StatusCodes.Status201Created,
                   new Response { Status = "Success", Message = $" registered successfully,Please Confirm Your Email before login. confirmation Email sent to {dto.Email} !" });


            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = "This role does not exist !" });

            }



        }
        [HttpPost("TrainerRegistration")]
        public async Task<IActionResult> TrainerRegister([FromForm] UserDTO dto, string role)
        {

            using var CVStream = new MemoryStream();
            await dto.CvFile.CopyToAsync(CVStream);
            // First check user existence
            var userExist = await _userManager.FindByEmailAsync(dto.Email);
            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = "User Already Exist !" });
            }

            // Add user to database 
            Backend_APIs.Models.User user = new()
            {
                Email = dto.Email,
                UserName = dto.UserName,
                CvFile = CVStream.ToArray(),
                Age = dto.Age,
                Gender = dto.Gender,
                Experience = dto.Experience,
                Specialization = dto.Specialization,
            };
            if (await _roleManager.RoleExistsAsync(role))
            {
                var result = await _userManager.CreateAsync(user, dto.Password);

                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = "Failed to create User !" });
                }
                //add role to the user if the role exist 
                await _userManager.AddToRoleAsync(user, role);

                if (role != "Trainer")
                {
                    //add token to verify email
                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var confirmationLink = Url.Action(nameof(ConfirmEmail), "Authentication", new { token, email = dto.Email }, Request.Scheme);
                    var message = new Message(new string[] { dto.Email! }, "Verify Your Email From Here ", confirmationLink);
                    _emailService.SendEmail(message);
                }
                return StatusCode(StatusCodes.Status201Created,
                   new Response { Status = "Success", Message = $" registered successfully,Please Confirm Your Email before login. confirmation Email sent to {dto.Email} !" });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = "This role does not exist !" });
            }



        }

        [HttpPost("send-verification-email")]
        public async Task<IActionResult> SendVerificationEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound(new Response { Status = "Error", Message = "Trainer not found!" });
            }

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationLink = Url.Action(nameof(ConfirmEmail), "Authentication", new { token, email = user.Email }, Request.Scheme);
            var message = new Message(new string[] { user.Email! }, "Confirmation email link", confirmationLink!);
            _emailService.SendEmail(message);

            return Ok(new Response { Status = "Success", Message = "Verification email sent successfully." });
        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string email, string token)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var result = await _userManager.ConfirmEmailAsync(user, token);
                if (result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status200OK,
                   new Response { Status = "Success", Message = "Email Verfied Successfully !" });
                }
            }
            return StatusCode(StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = "This user does not exist !" });
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromForm] LoginDto loginDto)
        {
            //checking email 
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            //check password if the user exist
            if (user != null && await _userManager.IsEmailConfirmedAsync(user) &&
                    await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                //create claimlist 
                var authClaim = new List<Claim> {
                    new Claim(ClaimTypes.Email,loginDto.Email),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                    new Claim("userId", user.Id.ToString()),
                    new Claim("userName",user.UserName.ToString()),

                };
                var userRole = await _userManager.GetRolesAsync(user);
                foreach (var x in userRole)
                {
                    //add role to the list 
                    authClaim.Add(new Claim(ClaimTypes.Role, x));
                }

                //generate the token with the list
                var jwtToken = GetToken(authClaim);

                //return the generated token
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                    expiration = jwtToken.ValidTo,
                    userId = user.Id,
                    userName = user.UserName,
                    role = userRole,
                });

            }
            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                return StatusCode(StatusCodes.Status401Unauthorized,
                       new Response { Status = "Unauthorized", Message = "Please Verify Your Email First Before Login" });
            }
            return Unauthorized();

        }
       
        
        private JwtSecurityToken GetToken(List<Claim> authClaim)
        {
            var SigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var token = new JwtSecurityToken
            (
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(2),
                claims: authClaim,
                signingCredentials: new SigningCredentials(SigninKey, SecurityAlgorithms.HmacSha256)

            );
            return token;
        }




    }
}
