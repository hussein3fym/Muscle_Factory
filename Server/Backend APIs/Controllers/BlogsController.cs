﻿using Backend_APIs.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private new List<String> _allowedExtetions = new List<string> { ".jpg", ".png", ".jpeg", "webp" };
        private long _maxAllowedSize = 5242880; //5MB

        public BlogsController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("TrainersBlogs")]
        public async Task<IActionResult> GetTrainersBlogs()
        {
            var blogs = await _context.Blogs.Include(b=>b.Trainer).Select(b=>new {b.Id, b.Title, b.BlogText,b.VideoURL,b.Image,b.Trainer.Name,b.TrainerId}).Where(b => b.TrainerId != null).ToListAsync();
            return Ok(blogs);
        }
        [HttpGet("AllAdminsBlogs")]
        public async Task<IActionResult> GetAdminBlogs()
        {
            var blogs = await _context.Blogs.Include(b => b.User).Select(b => new { b.Id, b.Title, b.BlogText, b.VideoURL, b.Image, b.User.Name, b.AdminId }).Where(b => b.AdminId != null).ToListAsync();
            return Ok(blogs);
        }
        [HttpGet("GetAdminBlogs/{adminId}")]
        public async Task<IActionResult> GetBlogsByAdminId(int adminId)
        {

            var blogs = await _context.Blogs
                .Where(b => b.AdminId == adminId)
                .ToListAsync();

            if (blogs == null || !blogs.Any())
            {
                return NotFound();
            }

            return Ok(blogs);
        }
        [HttpGet("AllBlogsUserModule")]
        public async Task<IActionResult> AllBlogs()
        {
            var blogs = await _context.Blogs
                .Include(b => b.Trainer)
                .Include(b => b.User)
                
                .Select(b => new
                {
                    b.Id,
                    b.Title,
                    b.BlogText,
                    b.VideoURL,
                    b.Image,
                    UserName = b.User.Name,
                    b.AdminId,
                    b.TrainerId,
                    TrainerName = b.Trainer.Name
                })
                .ToListAsync();

            return Ok(blogs);
        }
        [HttpGet("GetTrainerBlogs/{trainerId}")]
        public async Task<IActionResult> GetBlogsByTrainerId(int trainerId)
        {
            
            var blogs = await _context.Blogs
                .Where(b => b.TrainerId == trainerId)
                .ToListAsync();

            if (blogs == null || !blogs.Any())
            {
                return NotFound();
            }

            return Ok(blogs);
        }


        [HttpPost("CreateBlog")]
        public async Task<IActionResult> CreateBlog([FromForm] BlogDto dto)
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
            var blogTextWithLineBreaks = dto.BlogText.Replace("\n", "<br>");
            var blog = new Blog
            {
                AdminId = dto.AdminId,
                TrainerId = dto.TrainerId,
                Title = dto.Title,
                BlogText = blogTextWithLineBreaks,
                VideoURL = dto.VideoURL,
                Image = dataStream.ToArray(),


            };
            await _context.AddAsync(blog);
            _context.SaveChanges();

            return Ok(blog);

        }
        [HttpGet("GetBlog/{id}")]
        public async Task<IActionResult> GetBlogById(int id)
        {
            var Blog = await _context.Blogs.Select(q => new { q.Id, q.Title, q.BlogText, q.Image,q.VideoURL, q.AdminId, q.TrainerId }).SingleOrDefaultAsync(q => q.Id == id);
            if (Blog == null)
            {
                return NotFound();
            }
            return Ok(Blog);
        }
        [HttpPut(template:"{id}")]
        public async Task<IActionResult> UpdateBlog(int id, [FromForm] BlogDto dto)
        {
            var Blog = await _context.Blogs.FindAsync(id);

            if (Blog == null)
            {
                return NotFound();
            }
            if(dto.Image != null)
            {
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
                Blog.Image=dataStream.ToArray();
            }
            Blog.Title = dto.Title;
            Blog.BlogText = dto.BlogText;
            Blog.VideoURL = dto.VideoURL;
            _context.SaveChanges();
            return Ok(Blog);

        }
        [HttpDelete(template:"{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var blog = await _context.Blogs.SingleOrDefaultAsync(u => u.Id == id);

            if (blog == null)
            {
                return NotFound();
            }

            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();

            return Ok(blog);


        }
    }
}