/*
  Warnings:

  - Changed the type of `SAID` on the `Passenger` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Passenger" DROP COLUMN "SAID",
ADD COLUMN     "SAID" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_SAID_key" ON "Passenger"("SAID");
