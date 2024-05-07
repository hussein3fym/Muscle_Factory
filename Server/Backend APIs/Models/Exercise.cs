
namespace Backend_APIs.Models
{
    public class Exercise
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string ExerciseName { get; set; }
        public string Equipment { get; set; }
        public string TargetMuscle { get; set; }
        public string SecondaryMuscle { get; set; }
        public string Instructions { get; set; }
        public string Level { get; set; }
        public byte[]? Image { get; set; }
        //public byte[]? Video { get; set; }
        public string? YouTubeVideo { get; set; }
        public int? UserId { get; set; }
        public virtual User? User { get; set; }
       
    }
}
