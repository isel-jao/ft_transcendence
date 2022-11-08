/*
  Warnings:

  - You are about to drop the column `userId` on the `conversation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "conversation" DROP CONSTRAINT "conversation_userId_fkey";

-- AlterTable
ALTER TABLE "conversation" DROP COLUMN "userId";
