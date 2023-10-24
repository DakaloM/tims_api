/*
  Warnings:

  - The `availability` column on the `Employement` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('AVAILABLE', 'NOT_AVAILABLE');

-- AlterTable
ALTER TABLE "Employement" DROP COLUMN "availability",
ADD COLUMN     "availability" "Availability" NOT NULL DEFAULT 'NOT_AVAILABLE';

-- DropEnum
DROP TYPE "Availabity";
