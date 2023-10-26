/*
  Warnings:

  - You are about to drop the column `employementType` on the `EmploymentPosition` table. All the data in the column will be lost.
  - Added the required column `employmentType` to the `EmploymentPosition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmploymentPosition" DROP COLUMN "employementType",
ADD COLUMN     "employmentType" "EmploymentType" NOT NULL;
