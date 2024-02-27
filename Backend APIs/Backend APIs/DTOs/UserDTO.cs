namespace Backend_APIs.DTOs
{
    public class UserDTO
    {
       

        [MaxLength(length: 100)]
        public string Name { get; set; }

        [MaxLength(length: 100)]
        public string Email { get; set; }
        [MaxLength(length: 30)]
        public string Password { get; set; }
        [MaxLength(length: 5)]

        public string Type { get; set; } = "user";
        public int? Age { get; set; }
        [MaxLength(length: 6)]
        public string? Gender { get; set; }
        
    }
}
