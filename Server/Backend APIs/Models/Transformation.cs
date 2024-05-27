namespace Backend_APIs.Models
{
    public class Transformation
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public byte[]? File { get; set; }
        public int? UserId { get; set; }
        public virtual User? User { get; set; }
    }
}
