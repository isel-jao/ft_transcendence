-- CreateEnum
CREATE TYPE "userState" AS ENUM ('MUTED', 'ACTIVE', 'BANNED');

-- AlterTable
ALTER TABLE "User_Conv" ADD COLUMN     "status" "userState" NOT NULL DEFAULT 'ACTIVE';
