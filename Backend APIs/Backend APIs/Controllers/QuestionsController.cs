using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuestionsController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("AllQuestions")]
        public async Task<IActionResult> GetAllAsync()
        {
            var Questions = await _context.Questions.Include(q => q.User).Select(q => new { q.Id, q.QuestionText, q.UserId, q.User.Name }).ToListAsync();
            return Ok(Questions);
        }

        [HttpDelete]
        [Route("DeleteQuestion/{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var Question = await _context.Questions.SingleOrDefaultAsync(q => q.Id == id);

            if (Question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(Question);
            _context.SaveChanges();

            return Ok(Question);
        }
        [HttpGet("GetQuestion/{id}")]
        public async Task<IActionResult> GetQuestionById(int id)
        {
            var Question = await _context.Questions.Include(q=>q.User).Select(q => new { q.Id, q.User.Name, q.QuestionText, q.UserId }).SingleOrDefaultAsync(q=> q.Id == id);
            if (Question == null)
            {
                return NotFound();
            }
            return Ok(Question);
        }
    }
}
