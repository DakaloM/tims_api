/*
  Warnings:

  - You are about to drop the `Insuarance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Insuarance" DROP CONSTRAINT "Insuarance_vehicleId_fkey";

-- DropTable
DROP TABLE "Insuarance";

-- CreateTable
CREATE TABLE "Insurance" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "vehicleId" TEXT NOT NULL,

    CONSTRAINT "Insurance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Insurance_vehicleId_key" ON "Insurance"("vehicleId");

-- AddForeignKey
ALTER TABLE "Insurance" ADD CONSTRAINT "Insurance_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
