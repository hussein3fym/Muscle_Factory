namespace Backend_APIs.DTOs
{
    public class UpdateUserDataDTO
    {

        [MaxLength(length: 100)]
        public string UserName { get; set; }
        public string? Age { get; set; }
        [MaxLength(length: 6)]
        public string? Gender { get; set; }
    }
}