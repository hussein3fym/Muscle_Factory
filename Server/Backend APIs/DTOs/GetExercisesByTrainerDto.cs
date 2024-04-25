namespace Backend_APIs.DTOs
{
    public class GetExercisesByTrainerDto
    {
        [MaxLength(100)]
        public string? exerciseName { get; set; }
        public string? Equipment { get; set; }
        public string? TargetMuscle { get; set; }
        public string? SecondaryMuscle { get; set; }
        public string? Instructions { get; set; }
        public string? Level { get; set; }
        public IFormFile? Image { get; set; }
        public IFormFile? Video { get; set; }
        public int TrainerId { get; set; }
    }
}
