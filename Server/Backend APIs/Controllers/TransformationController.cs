using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Backend_APIs.DTOs;
using Microsoft.EntityFrameworkCore;


namespace Backend_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransformationController : Controller
    {
        private readonly Models.ApplicationDbContext _context;
        private readonly UserManager<Backend_APIs.Models.User> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;

        public TransformationController(ApplicationDbContext context, UserManager<Backend_APIs.Models.User> userManager, RoleManager<IdentityRole<int>> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        [HttpPost]
        public async Task<IActionResult> CreateByTrainerAsync([FromForm] TransformationDto dto)
        {
            if (dto.File == null)
            {
                return BadRequest(" Image Is Required!");
            }
            using var imageStream = new MemoryStream();
            await dto.File.CopyToAsync(imageStream);
            var InstructionsTextLineBreaks = @$"{dto.Description}".Replace("\n", "<br />\n");
            var transformation = new Transformation
            {
                Title = dto.Title,
                Description = dto.Description,
                File = imageStream.ToArray(),
                UserId = dto.UserId,
            };
            await _context.AddAsync(transformation);
            _context.SaveChanges();
            return Ok(transformation);
        }

        [HttpGet("count-transformation/{id}")]
        public async Task<ActionResult<int>> CountTransformationForTrainer(int id)
        {
            var trainer = await _context.Users
                .Include(t => t.Transformations)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (trainer == null)
            {
                return NotFound();
            }

            int transformationCount = trainer.Transformations.Count;
            return Ok(transformationCount);
        }

        [HttpGet("GetByUserId")]
        public async Task<IActionResult> GetByTrainerIdAsync(int UserId)
        {
            var transformation = await _context.Transformations
                .Where(e => e.UserId == UserId)
                .Include(e => e.User)
                .Select(e => new {
                    e.Id,
                    e.Title,
                    e.Description,
                    e.File,
                    e.UserId,
                })
                .ToListAsync();
            return Ok(transformation);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var transformation = await _context.Transformations.SingleOrDefaultAsync(g => g.Id == id);
            if (transformation == null)
                return NotFound("Not Found!");
            _context.Transformations.Remove(transformation);
            _context.SaveChanges();
            return Ok();

        }
    }
}
