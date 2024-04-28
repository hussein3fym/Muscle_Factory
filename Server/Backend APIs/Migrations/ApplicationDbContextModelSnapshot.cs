﻿// <auto-generated />
using System;
using Backend_APIs.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend_APIs.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.15")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Backend_APIs.Models.Blog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AdminId")
                        .HasColumnType("int");

                    b.Property<string>("BlogText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("Image")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TrainerId")
                        .HasColumnType("int");

                    b.Property<string>("VideoURL")
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar(1000)");

                    b.HasKey("Id");

                    b.HasIndex("AdminId");

                    b.HasIndex("TrainerId");

                    b.ToTable("Blogs");
                });

            modelBuilder.Entity("Backend_APIs.Models.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CommentText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int");

                    b.Property<int?>("TrainerId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.HasIndex("TrainerId");

                    b.HasIndex("UserId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("Backend_APIs.Models.Exercise", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Equipment")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ExerciseName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Instructions")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Level")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SecondaryMuscle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TargetMuscle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TrainerId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.Property<byte[]>("Video")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("YouTubeVideo")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("TrainerId");

                    b.HasIndex("UserId");

                    b.ToTable("Exercises");
                });

            modelBuilder.Entity("Backend_APIs.Models.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("QuestionText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("Backend_APIs.Models.Trainer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Experience")
                        .HasColumnType("int");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Specialization")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)")
                        .HasDefaultValue("rejected");

                    b.HasKey("Id");

                    b.ToTable("Trainers");
                });

            modelBuilder.Entity("Backend_APIs.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("Age")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Gender")
                        .HasMaxLength(6)
                        .HasColumnType("nvarchar(6)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(5)
                        .HasColumnType("nvarchar(5)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Backend_APIs.Models.User_Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<byte[]>("Image")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserID");

                    b.ToTable("user_Photos");
                });

            modelBuilder.Entity("Backend_APIs.Models.Blog", b =>
                {
                    b.HasOne("Backend_APIs.Models.User", "User")
                        .WithMany("Blogs")
                        .HasForeignKey("AdminId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Backend_APIs.Models.Trainer", "Trainer")
                        .WithMany("Blogs")
                        .HasForeignKey("TrainerId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("Trainer");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Backend_APIs.Models.Comment", b =>
                {
                    b.HasOne("Backend_APIs.Models.Question", "Question")
                        .WithMany("Comments")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend_APIs.Models.Trainer", "Trainer")
                        .WithMany("Comments")
                        .HasForeignKey("TrainerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Backend_APIs.Models.User", "User")
                        .WithMany("Comments")
                        .HasForeignKey("UserId");

                    b.Navigation("Question");

                    b.Navigation("Trainer");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Backend_APIs.Models.Exercise", b =>
                {
                    b.HasOne("Backend_APIs.Models.Trainer", "Trainer")
                        .WithMany("Exercises")
                        .HasForeignKey("TrainerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Backend_APIs.Models.User", "User")
                        .WithMany("Exercises")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Trainer");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Backend_APIs.Models.Question", b =>
                {
                    b.HasOne("Backend_APIs.Models.User", "User")
                        .WithMany("Questions")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Backend_APIs.Models.User_Photo", b =>
                {
                    b.HasOne("Backend_APIs.Models.User", "User")
                        .WithMany("User_Photos")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Backend_APIs.Models.Question", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("Backend_APIs.Models.Trainer", b =>
                {
                    b.Navigation("Blogs");

                    b.Navigation("Comments");

                    b.Navigation("Exercises");
                });

            modelBuilder.Entity("Backend_APIs.Models.User", b =>
                {
                    b.Navigation("Blogs");

                    b.Navigation("Comments");

                    b.Navigation("Exercises");

                    b.Navigation("Questions");

                    b.Navigation("User_Photos");
                });
#pragma warning restore 612, 618
        }
    }
}