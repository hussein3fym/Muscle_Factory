namespace Backend_APIs.Models
{
    public class Blog
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string BlogText { get; set; }

        public byte[] Image { get; set; }

        [MaxLength(length:1000)]
        public string? VideoURL { get; set; }
        public int? UserId { get; set; }
        public virtual User User { get; set; }

    }
}
