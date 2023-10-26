/*
  Warnings:

  - Added the required column `associationId` to the `EmploymentApplications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmploymentApplications" ADD COLUMN     "associationId" TEXT NOT NULL;
