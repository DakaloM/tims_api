/*
  Warnings:

  - The `code` column on the `License` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "License" DROP COLUMN "code",
ADD COLUMN     "code" INTEGER;
