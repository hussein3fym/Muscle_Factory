using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MuscleFactory.Models;
using MuscleFactory.Dtos;


namespace Backend_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainersController : ControllerBase
    {
        private readonly Models.ApplicationDbContext _context;

        public TrainersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var trainers = await _context.Trainers.ToListAsync();
            return Ok(trainers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var trainers = await _context.Trainers.FindAsync(id);
            if (trainers == null)
                return NotFound();
            return Ok(trainers);
        }
        [HttpGet("AcceptedTrainers")]
        public async Task<IActionResult> GetAcceptedTrainersAsync()
        {
            var trainers = await _context.Trainers
                .Where(e => e.Status == "accepted")
                .Select(e => new {
                    e.Id,
                    e.Status,
                    e.Name,
                    e.Email,
                    e.Age,
                    e.Experience,
                    e.Gender,
                    e.Specialization,
                })
                .ToListAsync();

            return Ok(trainers);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var trainers = await _context.Trainers.SingleOrDefaultAsync(g => g.Id == id);
            if (trainers == null)
                return NotFound("Not Found!");
            _context.Trainers.Remove(trainers);
            _context.SaveChanges();
            return Ok();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(int id )
        {
            //newvalue = "accepted";
            var trainers = await _context.Trainers.SingleOrDefaultAsync(g => g.Id == id) ;
            if (trainers == null)
                return NotFound("Not Found!");
            trainers.Status = "accepted";
            _context.SaveChanges();
            return Ok(trainers);
        }
    }
}
