using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_APIs.Migrations
{
    /// <inheritdoc />
    public partial class youtubevideo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "YouTubeVideo",
                table: "Exercises",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "YouTubeVideo",
                table: "Exercises");
        }
    }
}
