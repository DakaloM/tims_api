/*
  Warnings:

  - You are about to drop the `ApplicationRequirementsAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PositionRequirement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApplicationRequirementsAnswer" DROP CONSTRAINT "ApplicationRequirementsAnswer_requirementId_fkey";

-- DropForeignKey
ALTER TABLE "PositionRequirement" DROP CONSTRAINT "PositionRequirement_positionId_fkey";

-- DropTable
DROP TABLE "ApplicationRequirementsAnswer";

-- DropTable
DROP TABLE "PositionRequirement";
