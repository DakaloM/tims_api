/*
  Warnings:

  - The values [EXTERNAL] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `updatedAt` on the `Manifest` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `Manifest` table. All the data in the column will be lost.
  - You are about to drop the column `fisrtName` on the `Passenger` table. All the data in the column will be lost.
  - You are about to drop the column `RegistrationNumber` on the `QueueVehicle` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Passenger` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Passenger` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `registrationNumber` to the `QueueVehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passengerId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('INITIATED', 'COMPLETE', 'ON_ROUTE');

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'COMMUNITY';

-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('DRIVER', 'STAFF', 'OWNER', 'COMMUNITY', 'MARSHAL');
ALTER TABLE "User" ALTER COLUMN "type" TYPE "UserType_new" USING ("type"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Manifest" DROP COLUMN "updatedAt",
DROP COLUMN "updatedBy";

-- AlterTable
ALTER TABLE "Passenger" DROP COLUMN "fisrtName",
ADD COLUMN     "firstName" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "QueueVehicle" DROP COLUMN "RegistrationNumber",
ADD COLUMN     "registrationNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "arrivalTime" TIMESTAMP(3),
ADD COLUMN     "departureTime" TIMESTAMP(3),
ADD COLUMN     "status" "TripStatus" NOT NULL DEFAULT 'INITIATED';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passengerId" TEXT NOT NULL;
