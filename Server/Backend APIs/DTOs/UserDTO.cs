namespace Backend_APIs.DTOs
{
    public class UserDTO
    {
       

        [MaxLength(length: 100)]
        public string UserName { get; set; }

        [MaxLength(length: 100)]
        public string Email { get; set; }
        [MaxLength(length: 30)]
        public string Password { get; set; }
        public string? Age { get; set; }
        [MaxLength(length: 6)]
        public string? Gender { get; set; }
        public string? Specialization { get; set; }
        public string? Experience { get; set; }
        public string? Status { get; set; }
        public IFormFile? CvFile { get; set; }
    }
}
