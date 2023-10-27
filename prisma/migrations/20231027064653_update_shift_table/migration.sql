/*
  Warnings:

  - You are about to drop the column `knockOffTime` on the `Shift` table. All the data in the column will be lost.
  - You are about to drop the column `offDays` on the `Shift` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Shift` table. All the data in the column will be lost.
  - Added the required column `hours` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shift" DROP COLUMN "knockOffTime",
DROP COLUMN "offDays",
DROP COLUMN "startTime",
ADD COLUMN     "hours" TEXT NOT NULL;
