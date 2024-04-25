namespace Backend_APIs.DTOs
{
    public class CreateCommentDto
    {
        public string CommentText { get; set; }
        public int? TrainerId { get; set; }
        public int? UserId { get; set; }
        public int QuestionId { get; set; }
    }
}
