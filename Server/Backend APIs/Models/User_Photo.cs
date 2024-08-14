namespace Backend_APIs.Models
{
    public class User_Photo
    {
        public int Id { get; set; }
        public byte[] Image { get; set; }
        public int UserID { get; set; }


        public virtual User User { get; set; }

    }
}
