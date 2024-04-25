using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_APIs.Migrations
{
    /// <inheritdoc />
    public partial class updatetrainer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Muscles_MuscleId",
                table: "Exercises");

            migrationBuilder.DropTable(
                name: "Muscles");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_MuscleId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "MuscleId",
                table: "Exercises");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Trainers",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "rejected",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Trainers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true,
                oldDefaultValue: "rejected");

            migrationBuilder.AddColumn<int>(
                name: "MuscleId",
                table: "Exercises",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Muscles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MuscleName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Muscles", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_MuscleId",
                table: "Exercises",
                column: "MuscleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Muscles_MuscleId",
                table: "Exercises",
                column: "MuscleId",
                principalTable: "Muscles",
                principalColumn: "Id");
        }
    }
}
