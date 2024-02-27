
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend_APIs.DTOs;
using Backend_APIs.Models;

namespace Backend_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private new List<String> _allowedExtetions = new List<string> { ".jpg", ".png", ".jpeg" };
        private long _maxAllowedSize = 5242880;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("AllUsers")]
        public async Task<IActionResult> GetAllAsync()
        {
            var users=await _context.Users.Select(e =>new { e.Id, e.Name ,e.Email,e.Type }).Where(e => e.Type == "user").ToListAsync();
            return Ok(users);
        }
        [HttpGet("GetUser/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users.Select(e => new { e.Id, e.Name, e.Email, e.Type, e.Age,e.Gender}).SingleOrDefaultAsync(u=>u.Id==id);
            if (user == null)
            {
                return NotFound(); 
            }
            return Ok(user);
        }
        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound(); 
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

            return Ok(user);
        }
        [HttpPost("AddPhoto")]
        public async Task<IActionResult> AddPhoto([FromForm] UserPhotoDTO dto)
        {
            if (dto.Image == null)
            {
                return BadRequest(" Image Is Required!");
            }
            if (!_allowedExtetions.Contains(Path.GetExtension(dto.Image.FileName).ToLower()))
            {
                return BadRequest(error: "Only .jpg , .png ,.jpeg Are Allowed !");
            }
            if (dto.Image.Length > _maxAllowedSize)
            {
                return BadRequest(error: "The Maximam Allowed Size Is 5MB");
            }
            using var dataStream = new MemoryStream();
            await dto.Image.CopyToAsync(dataStream);
            var photo = new User_Photo
            {
                UserID = dto.UserID,
                Image = dataStream.ToArray(),


            };
            await _context.AddAsync(photo);
            _context.SaveChanges();

            return Ok(photo);

        }
        [HttpGet("GetUserPhotos/{UserID}")]
        public async Task<IActionResult> GetphotoByUserID(int UserID)
        {

            var Image = await _context.user_Photos
                .Where(b => b.UserID == UserID)
                .ToListAsync();

            if (Image == null || !Image.Any())
            {
                return NotFound();
            }

            return Ok(Image);
        }
        [HttpDelete(template: "{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var photo = await _context.user_Photos.SingleOrDefaultAsync(ph => ph.Id == id);

            if (photo == null)
            {
                return NotFound();
            }

            _context.user_Photos.Remove(photo);
            await _context.SaveChangesAsync();

            return Ok(photo);


        }
        [HttpPut(template: "{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] UserDTO dto)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            
            user.Name=dto.Name;
            user.Email=dto.Email;
            user.Age=dto.Age;
            user.Password=dto.Password;
            user.Gender=dto.Gender;
            user.Type=dto.Type;

            _context.SaveChanges();
            return Ok(user);

        }

    }
}
