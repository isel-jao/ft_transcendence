/*
  Warnings:

  - You are about to drop the `_admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_members` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "userState" ADD VALUE 'PENDING';

-- DropForeignKey
ALTER TABLE "_admins" DROP CONSTRAINT "_admins_A_fkey";

-- DropForeignKey
ALTER TABLE "_admins" DROP CONSTRAINT "_admins_B_fkey";

-- DropForeignKey
ALTER TABLE "_members" DROP CONSTRAINT "_members_A_fkey";

-- DropForeignKey
ALTER TABLE "_members" DROP CONSTRAINT "_members_B_fkey";

-- DropTable
DROP TABLE "_admins";

-- DropTable
DROP TABLE "_members";
