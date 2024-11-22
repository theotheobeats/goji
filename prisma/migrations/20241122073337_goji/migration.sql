/*
  Warnings:

  - You are about to drop the column `userId` on the `workspaces` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[inviteCode]` on the table `workspaces` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "workspaces" DROP CONSTRAINT "workspaces_userId_fkey";

-- AlterTable
ALTER TABLE "workspaces" DROP COLUMN "userId",
ADD COLUMN     "inviteCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_inviteCode_key" ON "workspaces"("inviteCode");
