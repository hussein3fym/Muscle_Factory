namespace Backend_APIs.Models
{
    public class Trainer
    {
        public int Id { get; set; }
        public string? Status { get; set; }
        public string? Type { get; set; }

        [MaxLength(100)]
        public string? Name { get; set; }

        public string? Email { get; set; }
        public string? Password { get; set; }
        public int Age { get; set; }
        public int YearsOfExperience { get; set; }
        public string? Gender { get; set; }
        public string? Specialization { get; set; }

        public virtual ICollection<Blog> Blogs { get; set; }



    }
}