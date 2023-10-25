/*
  Warnings:

  - You are about to drop the column `email` on the `CommitteeMember` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `CommitteeMember` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `CommitteeMember` table. All the data in the column will be lost.
  - Added the required column `userId` to the `CommitteeMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CommitteeMember_email_key";

-- DropIndex
DROP INDEX "CommitteeMember_name_key";

-- DropIndex
DROP INDEX "CommitteeMember_phone_key";

-- AlterTable
ALTER TABLE "CommitteeMember" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CommitteeMember" ADD CONSTRAINT "CommitteeMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
