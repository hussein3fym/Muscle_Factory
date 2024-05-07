using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_APIs.Migrations
{
    /// <inheritdoc />
    public partial class renamecv : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CV",
                table: "Users",
                newName: "CvFile");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CvFile",
                table: "Users",
                newName: "CV");
        }
    }
}
