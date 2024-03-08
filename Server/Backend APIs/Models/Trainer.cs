namespace Backend_APIs.Models
{
    public class Trainer
    {
        public int Id { get; set; }
        public string? Status { get; set; }

        [MaxLength(100)]
        public string? Name { get; set; }

        public string? Email { get; set; }
        public string? Password { get; set; }
        public int Age { get; set; }
        public int Experience { get; set; }
        public string? Gender { get; set; }
        public string? Specialization { get; set; }

        public virtual ICollection<Exercise> Exercises { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Blog> Blogs { get; set; }


    }
}
