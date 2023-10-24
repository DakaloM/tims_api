/*
  Warnings:

  - Changed the type of `status` on the `Employement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `employementType` on the `EmploymentPosition` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('CONTRACT', 'PERMANENT');

-- CreateEnum
CREATE TYPE "EmploymentStatus" AS ENUM ('TERMINATED', 'RESIGNED', 'ACTIVE');

-- AlterTable
ALTER TABLE "Employement" DROP COLUMN "status",
ADD COLUMN     "status" "EmploymentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "EmploymentPosition" DROP COLUMN "employementType",
ADD COLUMN     "employementType" "EmploymentType" NOT NULL;

-- DropEnum
DROP TYPE "EmployementStatus";

-- DropEnum
DROP TYPE "EmplymentType";
