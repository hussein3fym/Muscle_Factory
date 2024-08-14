namespace Backend_APIs.DTOs
{
    public class LoginDto
    {
        [Required(ErrorMessage ="Email is required!")]
        public string Email { get; set; } = "user";
        [Required(ErrorMessage = "Password is required!")]
        public string Password { get; set; } = "user";

    }
}
