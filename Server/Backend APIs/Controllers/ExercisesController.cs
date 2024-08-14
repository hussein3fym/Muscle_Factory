using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend_APIs.Models;
using Backend_APIs.DTOs;
using System.Xml.Linq;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity;
using System.Linq;


namespace Backend_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : ControllerBase
    {
        private readonly Models.ApplicationDbContext _context;
        private readonly UserManager<Backend_APIs.Models.User> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;

        public ExercisesController(ApplicationDbContext context, UserManager<Backend_APIs.Models.User> userManager, RoleManager<IdentityRole<int>> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;

        }


        //USER GETALL EXERCISE
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var exercises = await _context.Exercises.Include(e=>e.User)
                .Select(e => new {
                e.Id,
                e.ExerciseName,
                e.Equipment,
                e.TargetMuscle,
                e.SecondaryMuscle,
                e.Image,
                e.Level,
                e.UserId,
            }).ToListAsync();
            return Ok(exercises);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var exercises = await _context.Exercises.FindAsync(id);
            if (exercises == null)
                return NotFound();
            return Ok(exercises);
        }

        [HttpGet("ExercisesOfTrainers")]
        public async Task<IActionResult> GetExercisesOfTrainersAsync()
        {
            var trainers = await _userManager.GetUsersInRoleAsync("Trainer");
            var trainerUserIds = trainers.Select(u => u.Id).ToList();

            var exercises = await _context.Exercises
                .Where(e => trainerUserIds.Contains((int)e.UserId))
                .Select(e => new {
                    e.Id,
                    e.ExerciseName,
                    e.Equipment,
                    e.TargetMuscle,
                    e.SecondaryMuscle,
                    e.Level,
                    e.UserId,
                })
                .ToListAsync();
            return Ok(exercises);
        }

        [HttpGet("ExercisesOfAdmins")]
        public async Task<IActionResult> GetExercisesOfAdminsAsync()
        {
            var admin = await _userManager.GetUsersInRoleAsync("Admin");
            var adminUserIds = admin.Select(u => u.Id).ToList();

            var exercises = await _context.Exercises
                .Where(e => adminUserIds.Contains((int)e.UserId))
                .Select(e => new {
                    e.Id,
                    e.ExerciseName,
                    e.Equipment,
                    e.TargetMuscle,
                    e.SecondaryMuscle,
                    e.Level,
                    e.UserId,
                })
                .ToListAsync();
            return Ok(exercises);
        }

        [HttpGet("GetByUserId")]
        public async Task<IActionResult> GetByTrainerIdAsync(int UserId)
        {
            var exercises = await _context.Exercises
                .Where(e => e.UserId == UserId)
                .Include(e => e.User)
                .Select(e => new {
                    e.Id,
                    e.ExerciseName,
                    e.Equipment,
                    e.TargetMuscle,
                    e.SecondaryMuscle,
                    e.Level,
                    e.UserId,
                })
                .ToListAsync();
            return Ok(exercises);
        }

        [HttpGet("GetByTargetMuscle")]
        public async Task<IActionResult> GetByTargetMuscleAsync(string TargetMuscle)
        {
            var exercises = await _context.Exercises
                .Where(e => e.TargetMuscle == TargetMuscle)
                .Include(e => e.User)
                .Select(e => new {
                    e.Id,
                    e.ExerciseName,
                    e.Equipment,
                    e.TargetMuscle,
                    e.SecondaryMuscle,
                    e.Level,
                    e.UserId,
                })
                .ToListAsync();
            if (exercises == null || !exercises.Any())
            {
                return NotFound();
            }
            return Ok(exercises);
        }
        [HttpGet("CountAllExercises")]
        public async Task<IActionResult> CountAll()
        {

            var result = await _context.Exercises.CountAsync();

            return Ok(result);
        }

        [HttpPost("CreateByAdminOrTrainer")]
        public async Task<IActionResult> CreateByAdminAsync([FromForm] CreateExerciseDto dto)
        {
            if (dto.Image == null)
            {
                return BadRequest(" Image Is Required!");
            }
            using var imageStream = new MemoryStream();
            await dto.Image.CopyToAsync(imageStream);
            /*if (dto.Video == null)
            {
                return BadRequest(" Image Is Required!");
            }
            using var videoStream = new MemoryStream();
            await dto.Video.CopyToAsync(videoStream);*/
            var InstructionsTextLineBreaks = @$"{dto.Instructions}".Replace("\n", "<br />\n");
            var exercise = new Exercise
            {
                ExerciseName = dto.ExerciseName,
                Equipment = dto.Equipment,
                TargetMuscle = dto.TargetMuscle,
                SecondaryMuscle = dto.SecondaryMuscle,
                Instructions = InstructionsTextLineBreaks,
                Level = dto.Level,
                Image = imageStream.ToArray(),
                //Video = videoStream.ToArray(),
                UserId = dto.UserId,
                YouTubeVideo = dto.YouTubeVideo,
            };
            await _context.AddAsync(exercise);
            _context.SaveChanges();
            return Ok(exercise);
        }

        //DELETE BY ADMIN OR TRAINER
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var exercise = await _context.Exercises.SingleOrDefaultAsync(g => g.Id == id);
            if (exercise == null)
                return NotFound("Not Found!");
            _context.Exercises.Remove(exercise);
            _context.SaveChanges();
            return Ok();

        }

        //UPDATE BY ADMIN OR TRAINER
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromForm] CreateExerciseDto dto)
        {
            var exercise = await _context.Exercises.FindAsync(id);
            if (dto.Image != null)
            {
                using var imageStream = new MemoryStream();
                await dto.Image.CopyToAsync(imageStream);
                exercise.Image = imageStream.ToArray();
            }

            /*if (dto.Video != null)
            {
                using var videoStream = new MemoryStream();
                await dto.Video.CopyToAsync(videoStream);
                exercise.Video = videoStream.ToArray();
            }*/
            if (dto.ExerciseName != null)
            {
                exercise.ExerciseName = dto.ExerciseName;
            }
            if (dto.Equipment != null)
            {
                exercise.Equipment = dto.Equipment;
            }
            if (dto.TargetMuscle != null)
            {
                exercise.TargetMuscle = dto.TargetMuscle;
            }
            if (dto.SecondaryMuscle != null)
            {
                exercise.SecondaryMuscle = dto.SecondaryMuscle;
            }
            if (dto.Instructions != null)
            {
                exercise.Instructions = dto.Instructions;
            }
            if (dto.Level != null)
            {
                exercise.Level = dto.Level;
            }
            if (dto.YouTubeVideo != null)
            {
                exercise.YouTubeVideo = dto.YouTubeVideo;
            }
            _context.SaveChanges();
            return Ok(exercise);
        }

    }
}
