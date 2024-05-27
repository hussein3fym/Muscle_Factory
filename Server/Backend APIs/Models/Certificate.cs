namespace Backend_APIs.Models
{
    public class Certificate
    {
        public int Id { get; set; }
        public byte[]? File { get; set; }
        public int? UserId { get; set; }
        public virtual User? User { get; set; }
    }
}
