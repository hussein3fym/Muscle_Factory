namespace Backend_APIs.DTOs
{
    public class BlogDto
    {
        public string Title { get; set; }
        public string BlogText { get; set; }
        public IFormFile? Image { get; set; }

        [MaxLength(length: 1000)]
        public string? VideoURL { get; set; }
        public int? UserId { get; set; }
    }
}
