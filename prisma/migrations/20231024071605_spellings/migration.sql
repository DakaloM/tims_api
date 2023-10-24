/*
  Warnings:

  - The `availability` column on the `Employement` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Availabity" AS ENUM ('AVAILABLE', 'NOT_AVAILABLE');

-- AlterTable
ALTER TABLE "Employement" DROP COLUMN "availability",
ADD COLUMN     "availability" "Availabity" NOT NULL DEFAULT 'NOT_AVAILABLE';

-- DropEnum
DROP TYPE "Avalilabity";
