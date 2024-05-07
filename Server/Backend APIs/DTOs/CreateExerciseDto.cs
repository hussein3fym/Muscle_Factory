namespace Backend_APIs.DTOs
{
    public class CreateExerciseDto
    {
        [MaxLength(100)]
        public string ExerciseName { get; set; }
        public string Equipment { get; set; }
        public string TargetMuscle { get; set; }
        public string SecondaryMuscle { get; set; }
        public string Instructions { get; set; }
        public string Level { get; set; }
        public string? YouTubeVideo { get; set; }
        public IFormFile? Image { get; set; }
        //public IFormFile? Video { get; set; } 
        public int? UserId { get; set; }
        
    }
}
