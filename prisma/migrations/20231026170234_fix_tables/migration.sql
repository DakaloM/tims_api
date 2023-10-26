/*
  Warnings:

  - Added the required column `associationId` to the `Employement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `associationId` to the `EmploymentPosition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `associationId` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employement" ADD COLUMN     "associationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EmploymentPosition" ADD COLUMN     "associationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "associationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "EmploymentPosition" ADD CONSTRAINT "EmploymentPosition_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employement" ADD CONSTRAINT "Employement_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;
