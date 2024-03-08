﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MuscleFactory.Dtos;
using MuscleFactory.Models;
using System.Xml.Linq;

namespace Backend_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : ControllerBase
    {
        private readonly Models.ApplicationDbContext _context;

        public ExercisesController(ApplicationDbContext context)
        {
            _context = context;
        }

        
        //USER GETALL EXERCISE
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var exercises = await _context.Exercises.Include(e=>e.Trainer)
                .Select(e => new {
                e.Id,
                e.ExerciseName,
                e.Equipment,
                e.TargetMuscle,
                e.SecondaryMuscle,
                e.Level,
                e.TrainerId,
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
            var exercises = await _context.Exercises
                .Where(e => e.UserId == null)
                .Include(e => e.Trainer)
                .Select(e => new {
                    e.Id,
                    e.ExerciseName,
                    e.Equipment,
                    e.TargetMuscle,
                    e.SecondaryMuscle,
                    e.Level,
                    e.TrainerId,
                    e.MuscleId,
                })
                .ToListAsync();
            return Ok(exercises);
        }

        [HttpGet("ExercisesOfAdmins")]
        public async Task<IActionResult> GetExercisesOfAdminsAsync()
        {
            var exercises = await _context.Exercises
                .Where(e => e.Trainer == null)
                .Include(e => e.User)
                .Select(e => new {
                    e.Id,
                    e.ExerciseName,
                    e.Equipment,
                    e.TargetMuscle,
                    e.SecondaryMuscle,
                    e.Level,
                    e.UserId,
                    e.MuscleId,
                })
                .ToListAsync();
            return Ok(exercises);
        }

        [HttpGet("GetByTrainerId")]
        public async Task<IActionResult> GetByTrainerIdAsync(int TrainerId)
        {
            var exercises = await _context.Exercises
                .Where(e => e.TrainerId == TrainerId)
                .Include(e => e.Trainer)
                .Select(e => new {
                    e.Id,
                    e.ExerciseName,
                    e.Equipment,
                    e.TargetMuscle,
                    e.SecondaryMuscle,
                    e.Level,
                    e.TrainerId,
                    e.MuscleId,
                })
                .ToListAsync();
            return Ok(exercises);
        }

        [HttpGet("GetByMuscleId")]
        public async Task<IActionResult> GetByMuscleIdAsync(int MuscleId)
        {
            var exercises = await _context.Exercises
                .Where(e => e.MuscleId == MuscleId)
                .Include(e => e.Muscle)
                .Select(e => new {
                    e.Id,
                    e.ExerciseName,
                    e.Equipment,
                    e.TargetMuscle,
                    e.SecondaryMuscle,
                    e.Instructions,
                    e.Level,
                    e.Image,
                    e.Video,
                    e.TrainerId,
                    e.MuscleId,
                })
                .ToListAsync();
            return Ok(exercises);
        }

        [HttpPost("CreateByAdmin")]
        public async Task<IActionResult> CreateByAdminAsync([FromForm] CreateExerciseDto dto)
        {
            if (dto.Image == null)
            {
                return BadRequest(" Image Is Required!");
            }
            using var imageStream = new MemoryStream();
            await dto.Image.CopyToAsync(imageStream);
            if (dto.Video == null)
            {
                return BadRequest(" Image Is Required!");
            }
            using var videoStream = new MemoryStream();
            await dto.Video.CopyToAsync(videoStream);
            var exercise = new Exercise
            {
                ExerciseName = dto.ExerciseName,
                Equipment = dto.Equipment,
                TargetMuscle = dto.TargetMuscle,
                SecondaryMuscle = dto.SecondaryMuscle,
                Instructions = dto.Instructions,
                Level = dto.Level,
                Image = imageStream.ToArray(),
                Video = videoStream.ToArray(),
                UserId = dto.UserId,
                MuscleId = dto.MuscleId,
            };
            await _context.AddAsync(exercise);
            _context.SaveChanges();
            return Ok(exercise);
        }

        [HttpPost("CreateByTrainer")]
        public async Task<IActionResult> CreateByTrainerAsync([FromForm] CreateExerciseDto dto)
        {
            if (dto.Image == null)
            {
                return BadRequest(" Image Is Required!");
            }
            using var imageStream = new MemoryStream();
            await dto.Image.CopyToAsync(imageStream);
            if (dto.Video == null)
            {
                return BadRequest(" Image Is Required!");
            }
            using var videoStream = new MemoryStream();
            await dto.Video.CopyToAsync(videoStream);
            var exercise = new Exercise
            {
                ExerciseName = dto.ExerciseName,
                Equipment = dto.Equipment,
                TargetMuscle = dto.TargetMuscle,
                SecondaryMuscle = dto.SecondaryMuscle,
                Instructions = dto.Instructions,
                Level = dto.Level,
                Image = imageStream.ToArray(),
                Video = videoStream.ToArray(),
                TrainerId = dto.TrainerId,
                MuscleId = dto.MuscleId,
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

            if (dto.Video != null)
            {
                using var videoStream = new MemoryStream();
                await dto.Video.CopyToAsync(videoStream);
                exercise.Video = videoStream.ToArray();
            }
            exercise.ExerciseName = dto.ExerciseName;
            exercise.Equipment = dto.Equipment;
            exercise.TargetMuscle = dto.TargetMuscle;
            exercise.SecondaryMuscle = dto.SecondaryMuscle;
            exercise.Instructions = dto.Instructions;
            exercise.Level = dto.Level;
            //exercise.TrainerId = dto.TrainerId;
            _context.SaveChanges();
            return Ok(exercise);
        }

    }
}
