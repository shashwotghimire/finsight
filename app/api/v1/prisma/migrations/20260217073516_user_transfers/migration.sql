/*
  Warnings:

  - Added the required column `userId` to the `Transfers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transfers" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transfers" ADD CONSTRAINT "Transfers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
