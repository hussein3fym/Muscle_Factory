using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MuscleFactory.Dtos;
using MuscleFactory.Models;

namespace Backend_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly Models.ApplicationDbContext _context;
        public CommentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("CreateCommentByAdmin")]
        public async Task<IActionResult> CreateByAdminAsync(CreateCommentDto dto)
        {
            var comment = new Comment
            {
                CommentText = dto.CommentText, 
                UserId = dto.UserId,
                QuestionId = dto.QuestionId,
            };
            await _context.AddAsync(comment);
            _context.SaveChanges();
            return Ok(comment);
        }

        [HttpPost("CreateCommentByTrainer")]
        public async Task<IActionResult> CreateByTrainerAsync(CreateCommentDto dto)
        {
            var comment = new Comment
            {
                CommentText = dto.CommentText,
                TrainerId = dto.TrainerId,
                QuestionId = dto.QuestionId,
            };
            await _context.AddAsync(comment);
            _context.SaveChanges();
            return Ok(comment);
        }

        [HttpGet("GetCommentsByQuestionId")]
        public async Task<IActionResult> GetCommentsByQuestionId(int QuestionId)
        {
            var comments = await _context.Comments
                .Where(c=>c.QuestionId == QuestionId)
                .Select(c => new
                {
                    c.CommentText, c.UserId, c.Id
                }).ToListAsync();
            return Ok(comments);
        }

        //DELETE BY ADMIN OR TRAINER
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var comment = await _context.Comments.SingleOrDefaultAsync(c => c.Id == id);
            if (comment == null)
                return NotFound("Not Found!");
            _context.Comments.Remove(comment);
            _context.SaveChanges();
            return Ok();

        }

        //UPDATE BY ADMIN OR TRAINER
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(int id, CreateCommentDto dto)
        {
            var comment = await _context.Comments.FindAsync(id);
            comment.CommentText = dto.CommentText;
            comment.TrainerId = dto.TrainerId;
            comment.QuestionId = dto.QuestionId;
            _context.SaveChanges();
            return Ok(comment);
        }

    }




}
