/*
  Warnings:

  - You are about to drop the column `expiryDate` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `issueDate` on the `Document` table. All the data in the column will be lost.
  - Added the required column `name` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "expiryDate",
DROP COLUMN "issueDate",
ADD COLUMN     "name" TEXT NOT NULL;
