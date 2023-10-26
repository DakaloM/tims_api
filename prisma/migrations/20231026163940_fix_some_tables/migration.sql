/*
  Warnings:

  - Added the required column `associationId` to the `EmploymentPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmploymentPost" ADD COLUMN     "associationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "EmploymentApplications" ADD CONSTRAINT "EmploymentApplications_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentPost" ADD CONSTRAINT "EmploymentPost_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;
