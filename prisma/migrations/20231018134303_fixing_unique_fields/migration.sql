/*
  Warnings:

  - You are about to drop the column `vehicleid` on the `Finance` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleid` on the `Insuarance` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `NextOfKin` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `NextOfKin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `AssociationContact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Committee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `CommitteeMember` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[SAID]` on the table `EmploymentApplications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vehicleId]` on the table `Finance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vehicleId]` on the table `Insuarance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tripId]` on the table `Manifest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `NextOfKin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `NextOfKin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[IDNumber]` on the table `Passenger` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Passenger` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Passenger` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Rank` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[SAID]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vehicleId` to the `Finance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleId` to the `Insuarance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `names` to the `NextOfKin` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `amount` on the `VehicleIncome` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE');

-- DropForeignKey
ALTER TABLE "Finance" DROP CONSTRAINT "Finance_vehicleid_fkey";

-- DropForeignKey
ALTER TABLE "Insuarance" DROP CONSTRAINT "Insuarance_vehicleid_fkey";

-- DropIndex
DROP INDEX "Finance_vehicleid_key";

-- DropIndex
DROP INDEX "Insuarance_vehicleid_key";

-- AlterTable
ALTER TABLE "AssociationContact" ADD COLUMN     "status" "ContactStatus" NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "EmploymentPosition" ALTER COLUMN "roles" SET DATA TYPE TEXT[],
ALTER COLUMN "responsibilities" SET DATA TYPE TEXT[],
ALTER COLUMN "expectations" SET DATA TYPE TEXT[];

-- AlterTable
ALTER TABLE "Finance" DROP COLUMN "vehicleid",
ADD COLUMN     "vehicleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Insuarance" DROP COLUMN "vehicleid",
ADD COLUMN     "vehicleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "NextOfKin" DROP COLUMN "LastName",
DROP COLUMN "firstName",
ADD COLUMN     "names" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RoutePoint" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "VehicleIncome" DROP COLUMN "amount",
ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AssociationContact_email_key" ON "AssociationContact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Committee_name_key" ON "Committee"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CommitteeMember_name_key" ON "CommitteeMember"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EmploymentApplications_SAID_key" ON "EmploymentApplications"("SAID");

-- CreateIndex
CREATE UNIQUE INDEX "Finance_vehicleId_key" ON "Finance"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "Insuarance_vehicleId_key" ON "Insuarance"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "Manifest_tripId_key" ON "Manifest"("tripId");

-- CreateIndex
CREATE UNIQUE INDEX "NextOfKin_email_key" ON "NextOfKin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "NextOfKin_phone_key" ON "NextOfKin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_IDNumber_key" ON "Passenger"("IDNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_phone_key" ON "Passenger"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_email_key" ON "Passenger"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Rank_name_key" ON "Rank"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_SAID_key" ON "User"("SAID");

-- AddForeignKey
ALTER TABLE "Insuarance" ADD CONSTRAINT "Insuarance_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
