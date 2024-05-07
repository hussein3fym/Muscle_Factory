using Backend_APIs.Manager;
using Backend_APIs.Models;
using Backend_APIs.Validators;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using User.Management.Service.Models;
using User.Management.Service.Services;
using User.Management.Services.Services;


var builder = WebApplication.CreateBuilder(args);
var Configration = builder.Configuration;

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString(name: "DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
options.UseSqlServer(connectionString));

//emailconfermationrequired
builder.Services.Configure<IdentityOptions>(options =>
{
    // Configure signin behavior to use email instead of username
    options.SignIn.RequireConfirmedEmail = true; // Require email confirmation for sign-in
    options.User.RequireUniqueEmail = true; // Ensure unique email addresses
    options.User.AllowedUserNameCharacters = null; // Allow any characters in the username (optional)
});


builder.Services.AddIdentity<Backend_APIs.Models.User, IdentityRole<int>>(options =>
{

    options.User.RequireUniqueEmail = true;



})
.AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders()
.AddUserValidator<CustomUserValidator<Backend_APIs.Models.User>>();
builder.Services.AddScoped<UserManager<Backend_APIs.Models.User>, CustomUserManager>();
builder.Services.AddScoped<RoleManager<IdentityRole<int>>>();
builder.Services.AddScoped<IUserStore<Backend_APIs.Models.User>, CustomUserStore>();




//authentication 
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

});
//add email Configrations 
var emailConfig = Configration.GetSection("EmailConfigration").Get<User.Management.Service.Models.EmailConfiguration>();
builder.Services.AddSingleton(emailConfig);
builder.Services.AddSingleton<IEmailService, EmailService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
builder.Services.AddCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(c => c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseAuthorization();

app.MapControllers();

app.Run();
