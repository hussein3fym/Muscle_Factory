namespace Backend_APIs.DTOs
{
    public class TransformationDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public IFormFile? File { get; set; }
        public int? UserId { get; set; }
    }
}
