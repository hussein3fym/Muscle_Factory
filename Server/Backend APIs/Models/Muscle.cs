namespace Backend_APIs.Models
{
    public class Muscle
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string? MuscleName { get; set; }
        public virtual ICollection<Exercise> Exercises { get; set; }
    }
}
