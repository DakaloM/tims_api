/*
  Warnings:

  - You are about to drop the column `passengerId` on the `NextOfKin` table. All the data in the column will be lost.
  - Made the column `userId` on table `NextOfKin` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `emergencyContact` to the `Passenger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NextOfKin" DROP CONSTRAINT "NextOfKin_passengerId_fkey";

-- AlterTable
ALTER TABLE "NextOfKin" DROP COLUMN "passengerId",
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Passenger" ADD COLUMN     "emergencyContact" TEXT NOT NULL;
