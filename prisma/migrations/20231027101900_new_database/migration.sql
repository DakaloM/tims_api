/*
  Warnings:

  - A unique constraint covering the columns `[vehicleId]` on the table `License` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "License" ADD COLUMN     "vehicleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "License_vehicleId_key" ON "License"("vehicleId");

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
