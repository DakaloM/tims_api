-- CreateEnum
CREATE TYPE "CommuniocationStatus" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "Communication" ADD COLUMN     "assignedTo" TEXT,
ADD COLUMN     "status" "CommuniocationStatus" NOT NULL DEFAULT 'OPEN';
