using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Backend_APIs.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Backend_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertificatesController : Controller
    {
         private readonly Models.ApplicationDbContext _context;
        private readonly UserManager<Backend_APIs.Models.User> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;

        public CertificatesController(ApplicationDbContext context, UserManager<Backend_APIs.Models.User> userManager, RoleManager<IdentityRole<int>> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        [HttpPost]
        public async Task<IActionResult> CreateByTrainerAsync([FromForm] CertificateDto dto)
        {
            if (dto.File == null)
            {
                return BadRequest(" Image Is Required!");
            }
            using var imageStream = new MemoryStream();
            await dto.File.CopyToAsync(imageStream);
            var certificate = new Certificate
            {
                File = imageStream.ToArray(),
                UserId = dto.UserId,
            };
            await _context.AddAsync(certificate);
            _context.SaveChanges();
            return Ok(certificate);
        }

        [HttpGet("count-certificate/{id}")]
        public async Task<ActionResult<int>> CountCertificateForTrainer(int id)
        {
            var trainer = await _context.Users
                .Include(t => t.Certificates)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (trainer == null)
            {
                return NotFound();
            }

            int CertificateCount = trainer.Certificates.Count;
            return Ok(CertificateCount);
        }

        [HttpGet("GetByUserId")]
        public async Task<IActionResult> GetByTrainerIdAsync(int UserId)
        {
            var certificate = await _context.Certificates
                .Where(e => e.UserId == UserId)
                .Include(e => e.User)
                .Select(e => new {
                    e.Id,
                    e.File,
                    e.UserId,
                })
                .ToListAsync();
            return Ok(certificate);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var certificate = await _context.Certificates.SingleOrDefaultAsync(g => g.Id == id);
            if (certificate == null)
                return NotFound("Not Found!");
            _context.Certificates.Remove(certificate);
            _context.SaveChanges();
            return Ok();

        }
    }
}
