/*
  Warnings:

  - You are about to drop the column `comitteeId` on the `Meeting` table. All the data in the column will be lost.
  - Added the required column `committeeId` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meeting" DROP CONSTRAINT "Meeting_comitteeId_fkey";

-- AlterTable
ALTER TABLE "Meeting" DROP COLUMN "comitteeId",
ADD COLUMN     "committeeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
