/*
  Warnings:

  - You are about to drop the `TaxiFare` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fare` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TaxiFare" DROP CONSTRAINT "TaxiFare_associationId_fkey";

-- DropForeignKey
ALTER TABLE "TaxiFare" DROP CONSTRAINT "TaxiFare_routeId_fkey";

-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "fare" DECIMAL(65,30) NOT NULL;

-- DropTable
DROP TABLE "TaxiFare";
