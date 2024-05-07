namespace Backend_APIs.DTOs
{
    public class UpdateTrainererDto
    {
        public string Status { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string? Specialization { get; set; }
        public string? Age { get; set; }
        public string? Experience { get; set; }
    }
}
