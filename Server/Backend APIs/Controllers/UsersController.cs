
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend_APIs.DTOs;
using Backend_APIs.Models;
using Microsoft.AspNetCore.Identity;

namespace Backend_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private new List<String> _allowedExtetions = new List<string> { ".jpg", ".png", ".jpeg" };
        private long _maxAllowedSize = 5242880;
        private readonly UserManager<Backend_APIs.Models.User> _userManager;

        public UsersController(ApplicationDbContext context, UserManager<Backend_APIs.Models.User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("AllUsers")]
        public async Task<IActionResult> GetAllAsync()
        {
            // Retrieve users with the role "User"
            var users = await _userManager.GetUsersInRoleAsync("User");

            // Select only the properties you want to return
            var result = users.Select(u => new
            {
                u.Id,
                u.UserName,
                u.Email
                // Include other properties if needed
            }).ToList();

            return Ok(result);
        }
        [HttpGet("CountAllUsers")]
        public async Task<IActionResult> CountAllUsers()
        {
            // Retrieve users with the role "User"
            var users = await _userManager.GetUsersInRoleAsync("User");
            var result = users.Count();

            return Ok(result);
        }
        [HttpGet("CountAllTrainers")]
        public async Task<IActionResult> CountAllTrainers()
        {
            // Retrieve users with the role "User"
            var users = await _userManager.GetUsersInRoleAsync("Trainer");
            var result = users.Count();

            return Ok(result);
        }
        [HttpGet("accepted")]
        public async Task<IActionResult> GetAcceptedAsync()
        {
            var users = await _userManager.GetUsersInRoleAsync("Trainer");

            var result = users.Select(e => new
            {
                e.Id,
                e.Status,
                e.UserName,
                e.Email,
                e.Age,
                e.Experience,
                e.Gender,
                e.Specialization,
                e.Photo,
                e.CvFile,
            }).Where(e => e.Status == "accepted").ToList();

            return Ok(result);
        }

        [HttpGet("rejected")]
        public async Task<IActionResult> GetRejectedAsync()
        {
            var users = await _userManager.GetUsersInRoleAsync("Trainer");

            var result = users.Select(e => new
            {
                e.Id,
                e.Status,
                e.UserName,
                e.Email,
                e.Age,
                e.Experience,
                e.Gender,
                e.Specialization,
                e.CvFile,
            }).Where(e => e.Status == "rejected").ToList();

            return Ok(result);
        }

        [HttpGet("download-cv/{userId}")]
        public async Task<IActionResult> DownloadCvFile(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null || user.CvFile == null)
            {
                return NotFound();
            }

            var fileContent = user.CvFile;
            var contentType = "application/octet-stream"; // Change if you know the correct MIME type
            var fileName = "cv_" + user.UserName + ".pdf"; // Or other appropriate extension

            return File(fileContent, contentType, fileName);
        }

        [HttpGet("GetUser/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users.Select(e => new {
                e.Id,
                e.Status,
                e.UserName,
                e.Email,
                e.Age,
                e.Experience,
                e.Gender,
                e.Specialization,
                e.Photo,
            })
                .SingleOrDefaultAsync(u=>u.Id==id);
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
        public async Task<IActionResult> Update(int id, [FromForm] UpdateUserDataDTO dto)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            if (dto.UserName != null)
            {
                user.UserName = dto.UserName;
            }


            if (dto.Age != null)
            {
                user.Age = dto.Age;
            }

            if (dto.Gender != null)
            {
                user.Gender = dto.Gender;
            }

            _context.SaveChanges();
            return Ok(user);
        }


        [HttpPut("updatestatus/{id}")]
        public async Task<IActionResult> UpdateAsync(int id)
        {

            var users = await _context.Users.SingleOrDefaultAsync(g => g.Id == id);
            if (users == null)
                return NotFound("Not Found!");
            var isTrainer = await _userManager.IsInRoleAsync(users, "Trainer");
            if (!isTrainer)
                return StatusCode(StatusCodes.Status403Forbidden, new Response { Status = "Error", Message = "User is not a Trainer!" });
            users.Status = "accepted";
            _context.SaveChanges();
            return Ok(users);
        }

       /* [HttpGet("AcceptedTrainers")]
        public async Task<IActionResult> GetAcceptedTrainersAsync()
        {
            var users = await _context.Users
                .Where(e => e.Status == "accepted" && _userManager.IsInRoleAsync(e, "Trainer").Result)
                .Select(e => new {
                    e.Id,
                    e.Status,
                    e.UserName,
                    e.Email,
                    e.Age,
                    e.Experience,
                    e.Gender,
                    e.Specialization,
                })
                .ToListAsync();

            return Ok(users);
        } */

        [HttpGet("Trainers")]
        public async Task<IActionResult> GetTrainersAsync()
        {
            var users = await _userManager.GetUsersInRoleAsync("Trainer");
            var trainerDetails = users.Select(e => new {
                e.Id,
                e.Status,
                e.UserName,
                e.Email,
                e.Age,
                e.Experience,
                e.Gender,
                e.Specialization,
            }).ToList();

            return Ok(users);
        }

        /*[HttpGet("RejectedTrainers")]
        public async Task<IActionResult> GetRejectedTrainersAsync()
        {
            var users = await _userManager.GetUsersInRoleAsync("Trainer");

            var result = users.Select(e => new
            {
                e.Id,
                e.Status,
                e.UserName,
                e.Email,
                e.Age,
                e.Experience,
                e.Gender,
                e.Specialization,
            }).Where(e => e.Status == "rejected").ToList();

            return Ok(users);
        }*/

        [HttpGet("count-exercises/{id}")]
        public async Task<ActionResult<int>> CountExercisesForTrainer(int id)
        {
            var trainer = await _context.Users
                .Include(t => t.Exercises)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (trainer == null)
            {
                return NotFound();
            }

            int exerciseCount = trainer.Exercises.Count;
            return Ok(exerciseCount);
        }

        [HttpGet("count-blogs/{id}")]
        public async Task<ActionResult<int>> CountBlogsForTrainer(int id)
        {
            var trainer = await _context.Users
                .Include(t => t.Blogs)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (trainer == null)
            {
                return NotFound();
            }

            int blogsCount = trainer.Blogs.Count;
            return Ok(blogsCount);
        }

        //UPDATE TRAINER PROFILE
        [HttpPut("UpdateTrainerProfile/{id}")]
        public async Task<IActionResult> UpdateTrainerProfileAsync(int id, [FromForm] UpdateTrainererDto dto)
        {
            var user = await _context.Users.FindAsync(id);

            if (dto.UserName != null)
            {
                user.UserName = dto.UserName;
            }
            if (dto.Age != null)
             {
                 user.Age = dto.Age;
             }
             if (dto.Experience != null)
             {
                 user.Experience = dto.Experience;
             }
            if (dto.Specialization != null)
             {
                 user.Specialization = dto.Specialization;
             }
            _context.SaveChanges();
            return Ok(user);
        }

        //UPDATE PROFILE PIC
        [HttpPut("UpdateProfilePic/{id}")]
        public async Task<IActionResult> UpdateProfilePicAsync(int id, [FromForm] UpdateUserPhotoDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (dto.Photo != null)
            {
                using var imageStream = new MemoryStream();
                await dto.Photo.CopyToAsync(imageStream);
                user.Photo = imageStream.ToArray();
            }
            _context.SaveChanges();
            return Ok(user);
        }

    }
}
