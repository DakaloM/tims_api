-- AlterEnum
ALTER TYPE "DocumentType" ADD VALUE 'CONTRACT';

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "employmentId" TEXT;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_employmentId_fkey" FOREIGN KEY ("employmentId") REFERENCES "Employment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
