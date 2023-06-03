using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UserSettingsFoerignKeyTweaks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserSettings_Attachment_AvatarAttachmentKey",
                table: "UserSettings");

            migrationBuilder.DropIndex(
                name: "IX_UserSettings_AvatarAttachmentKey",
                table: "UserSettings");

            migrationBuilder.AddForeignKey(
                name: "FK_Attachment_UserSettings_AttachmentKey",
                table: "Attachment",
                column: "AttachmentKey",
                principalTable: "UserSettings",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attachment_UserSettings_AttachmentKey",
                table: "Attachment");

            migrationBuilder.CreateIndex(
                name: "IX_UserSettings_AvatarAttachmentKey",
                table: "UserSettings",
                column: "AvatarAttachmentKey");

            migrationBuilder.AddForeignKey(
                name: "FK_UserSettings_Attachment_AvatarAttachmentKey",
                table: "UserSettings",
                column: "AvatarAttachmentKey",
                principalTable: "Attachment",
                principalColumn: "AttachmentKey");
        }
    }
}
