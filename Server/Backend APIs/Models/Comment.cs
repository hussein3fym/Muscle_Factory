namespace Backend_APIs.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string CommentText { get; set; }
        public int? TrainerId { get; set; }
        public Trainer? Trainer { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }

    }
}
