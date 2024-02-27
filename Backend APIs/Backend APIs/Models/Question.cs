namespace Backend_APIs.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string  QuestionText { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

    }
}
