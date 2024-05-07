using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_APIs.Migrations
{
    /// <inheritdoc />
    public partial class newmig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blogs_Trainers_TrainerId",
                table: "Blogs");

            migrationBuilder.DropForeignKey(
                name: "FK_Blogs_Users_AdminId",
                table: "Blogs");

            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Trainers_TrainerId",
                table: "Exercises");

            migrationBuilder.RenameColumn(
                name: "AdminId",
                table: "Blogs",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Blogs_AdminId",
                table: "Blogs",
                newName: "IX_Blogs_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Blogs_Trainers_TrainerId",
                table: "Blogs",
                column: "TrainerId",
                principalTable: "Trainers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Blogs_Users_UserId",
                table: "Blogs",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Trainers_TrainerId",
                table: "Exercises",
                column: "TrainerId",
                principalTable: "Trainers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blogs_Trainers_TrainerId",
                table: "Blogs");

            migrationBuilder.DropForeignKey(
                name: "FK_Blogs_Users_UserId",
                table: "Blogs");

            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Trainers_TrainerId",
                table: "Exercises");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Blogs",
                newName: "AdminId");

            migrationBuilder.RenameIndex(
                name: "IX_Blogs_UserId",
                table: "Blogs",
                newName: "IX_Blogs_AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_Blogs_Trainers_TrainerId",
                table: "Blogs",
                column: "TrainerId",
                principalTable: "Trainers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Blogs_Users_AdminId",
                table: "Blogs",
                column: "AdminId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Trainers_TrainerId",
                table: "Exercises",
                column: "TrainerId",
                principalTable: "Trainers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
