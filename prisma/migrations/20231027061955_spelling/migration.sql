/*
  Warnings:

  - You are about to drop the `Employement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employement" DROP CONSTRAINT "Employement_associationId_fkey";

-- DropForeignKey
ALTER TABLE "Employement" DROP CONSTRAINT "Employement_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Employement" DROP CONSTRAINT "Employement_positionId_fkey";

-- DropForeignKey
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_employmentId_fkey";

-- DropTable
DROP TABLE "Employement";

-- CreateTable
CREATE TABLE "Employment" (
    "id" TEXT NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "positionId" TEXT NOT NULL,
    "employeeId" TEXT,
    "associationId" TEXT NOT NULL,
    "status" "EmploymentStatus" NOT NULL DEFAULT 'ACTIVE',
    "availability" "Availability" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "Employment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employment_referenceNumber_key" ON "Employment"("referenceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Employment_employeeId_key" ON "Employment"("employeeId");

-- AddForeignKey
ALTER TABLE "Employment" ADD CONSTRAINT "Employment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employment" ADD CONSTRAINT "Employment_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "EmploymentPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employment" ADD CONSTRAINT "Employment_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_employmentId_fkey" FOREIGN KEY ("employmentId") REFERENCES "Employment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
