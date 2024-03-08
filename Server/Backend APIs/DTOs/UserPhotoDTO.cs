namespace Backend_APIs.DTOs
{
    public class UserPhotoDTO
    {
       
        public IFormFile? Image { get; set; }
        public int UserID { get; set; }

    }
}
