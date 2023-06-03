using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class SimplifyAttachmentTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AttachmentBlob");

            migrationBuilder.DropTable(
                name: "Attachment");

            migrationBuilder.DropTable(
                name: "UserSettings");

            migrationBuilder.CreateTable(
                name: "Avatar",
                columns: table => new
                {
                    AvatarKey = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContentType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContentLength = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Avatar", x => x.AvatarKey);
                    table.ForeignKey(
                        name: "FK_Avatar_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AvatarBlob",
                columns: table => new
                {
                    AvatarBlobKey = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AvatarKey = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Blob = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvatarBlob", x => x.AvatarBlobKey);
                    table.ForeignKey(
                        name: "FK_AvatarBlob_Avatar_AvatarKey",
                        column: x => x.AvatarKey,
                        principalTable: "Avatar",
                        principalColumn: "AvatarKey",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Avatar_UserId",
                table: "Avatar",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AvatarBlob_AvatarKey",
                table: "AvatarBlob",
                column: "AvatarKey",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AvatarBlob");

            migrationBuilder.DropTable(
                name: "Avatar");

            migrationBuilder.CreateTable(
                name: "UserSettings",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AvatarAttachmentKey = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSettings", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_UserSettings_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Attachment",
                columns: table => new
                {
                    AttachmentKey = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ContentLength = table.Column<long>(type: "bigint", nullable: false),
                    ContentType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attachment", x => x.AttachmentKey);
                    table.ForeignKey(
                        name: "FK_Attachment_UserSettings_AttachmentKey",
                        column: x => x.AttachmentKey,
                        principalTable: "UserSettings",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AttachmentBlob",
                columns: table => new
                {
                    AttachmentKey = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Blob = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttachmentBlob", x => x.AttachmentKey);
                    table.ForeignKey(
                        name: "FK_AttachmentBlob_Attachment_AttachmentKey",
                        column: x => x.AttachmentKey,
                        principalTable: "Attachment",
                        principalColumn: "AttachmentKey",
                        onDelete: ReferentialAction.Cascade);
                });
        }
    }
}
