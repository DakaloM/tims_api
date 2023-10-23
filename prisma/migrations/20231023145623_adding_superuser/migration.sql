/*
  Warnings:

  - You are about to drop the column `members` on the `CommitteeMember` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `Communication` table. All the data in the column will be lost.
  - You are about to drop the column `roles` on the `EmploymentPosition` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `createdAd` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `IDNumber` on the `Passenger` table. All the data in the column will be lost.
  - You are about to drop the column `emplymentId` on the `Shift` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[SAID]` on the table `Passenger` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employmentId]` on the table `Shift` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `issueDate` on the `License` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `expiryDate` on the `License` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `SAID` to the `Passenger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Passenger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marshalId` to the `Queue` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `RoutePoint` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `employmentId` to the `Shift` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `year` on the `Vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_emplymentId_fkey";

-- DropIndex
DROP INDEX "Passenger_IDNumber_key";

-- DropIndex
DROP INDEX "Shift_emplymentId_key";

-- AlterTable
ALTER TABLE "CommitteeMember" DROP COLUMN "members";

-- AlterTable
ALTER TABLE "Communication" DROP COLUMN "createdDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "issueDate" DROP NOT NULL,
ALTER COLUMN "expiryDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EmploymentPosition" DROP COLUMN "roles",
ADD COLUMN     "duties" TEXT[];

-- AlterTable
ALTER TABLE "EmploymentPost" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "License" DROP COLUMN "typeId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT,
DROP COLUMN "issueDate",
ADD COLUMN     "issueDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "expiryDate",
ADD COLUMN     "expiryDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "createdAd",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Passenger" DROP COLUMN "IDNumber",
ADD COLUMN     "SAID" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Queue" ADD COLUMN     "marshalId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RoutePoint" ALTER COLUMN "coordinates" DROP NOT NULL,
ALTER COLUMN "address" SET NOT NULL;

-- AlterTable
ALTER TABLE "Shift" DROP COLUMN "emplymentId",
ADD COLUMN     "employmentId" TEXT NOT NULL,
ADD COLUMN     "offDays" TEXT[],
ADD COLUMN     "workingDays" TEXT[];

-- AlterTable
ALTER TABLE "TaxiFare" ALTER COLUMN "previousPrice" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SuperAccount" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuperAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperAccount_email_key" ON "SuperAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAccount_phone_key" ON "SuperAccount"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_SAID_key" ON "Passenger"("SAID");

-- CreateIndex
CREATE UNIQUE INDEX "Shift_employmentId_key" ON "Shift"("employmentId");

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_employmentId_fkey" FOREIGN KEY ("employmentId") REFERENCES "Employement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
