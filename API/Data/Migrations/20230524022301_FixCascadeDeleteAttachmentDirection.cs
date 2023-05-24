using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixCascadeDeleteAttachmentDirection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attachment_AttachmentBlob_AttachmentKey",
                table: "Attachment");

            migrationBuilder.AddForeignKey(
                name: "FK_AttachmentBlob_Attachment_AttachmentKey",
                table: "AttachmentBlob",
                column: "AttachmentKey",
                principalTable: "Attachment",
                principalColumn: "AttachmentKey",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AttachmentBlob_Attachment_AttachmentKey",
                table: "AttachmentBlob");

            migrationBuilder.AddForeignKey(
                name: "FK_Attachment_AttachmentBlob_AttachmentKey",
                table: "Attachment",
                column: "AttachmentKey",
                principalTable: "AttachmentBlob",
                principalColumn: "AttachmentKey",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
