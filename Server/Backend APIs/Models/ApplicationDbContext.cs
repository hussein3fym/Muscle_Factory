using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;





namespace Backend_APIs.Models
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }


        public DbSet<Exercise> Exercises { get; set; }
        
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<User_Photo> user_Photos { get; set; }
        public DbSet<Transformation> Transformations { get; set; }
        public DbSet<Certificate> Certificates { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<IdentityRole<int>>().ToTable("AspNetRoles");
            seedRoles(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);


            /*
            modelBuilder.Entity<Question>()
               .HasOne(a => a.User)
               .WithMany(q => q.Questions)
               .HasForeignKey(a => a.UserId)
               .OnDelete(DeleteBehavior.Cascade);*/

            modelBuilder.Entity<Blog>()
                 .HasOne(a => a.User)
               .WithMany(b => b.Blogs)
               .HasForeignKey(a => a.UserId)
               .OnDelete(DeleteBehavior.SetNull)
               .OnDelete(DeleteBehavior.Cascade);



           
            modelBuilder.Entity<Blog>()
           .Property(p => p.UserId).IsRequired(required: false);

            modelBuilder.Entity<User_Photo>()
               .HasOne(a => a.User)
               .WithMany(q => q.User_Photos)
               .HasForeignKey(a => a.UserID)
               .OnDelete(DeleteBehavior.Cascade);

            

          

            modelBuilder.Entity<Exercise>()
             .HasOne(a => a.User)
             .WithMany(q => q.Exercises)
             .HasForeignKey(a => a.UserId)
             .OnDelete(DeleteBehavior.Cascade);

            


            modelBuilder.Entity<Transformation>()
                            .HasOne(a => a.User)
                          .WithMany(b => b.Transformations)
                          .HasForeignKey(a => a.UserId)
                          .OnDelete(DeleteBehavior.SetNull)
                          .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<Certificate>()
                    .HasOne(a => a.User)
                    .WithMany(b => b.Certificates)
                    .HasForeignKey(a => a.UserId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .OnDelete(DeleteBehavior.Cascade);

        }
        private static void seedRoles(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityRole<int>>().HasData(
                new IdentityRole<int>() { Id = 1, Name = "Admin", ConcurrencyStamp = "1", NormalizedName = "Admin" },
                new IdentityRole<int>() { Id = 2, Name = "User", ConcurrencyStamp = "2", NormalizedName = "User" },
                new IdentityRole<int>() { Id = 3, Name = "Trainer", ConcurrencyStamp = "3", NormalizedName = "Trainer" }
            );
        }

    }

}
