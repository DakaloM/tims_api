/*
  Warnings:

  - Added the required column `associationId` to the `CommitteeMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommitteeMember" ADD COLUMN     "associationId" TEXT NOT NULL;
