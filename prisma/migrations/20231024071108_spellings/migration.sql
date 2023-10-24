/*
  Warnings:

  - The `status` column on the `EmploymentPosition` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EmploymentPositionStatus" AS ENUM ('FILLED', 'VACANT');

-- AlterTable
ALTER TABLE "EmploymentPosition" DROP COLUMN "status",
ADD COLUMN     "status" "EmploymentPositionStatus" NOT NULL DEFAULT 'VACANT';

-- DropEnum
DROP TYPE "employementPositionStatus";
