/*
  Warnings:

  - The `currency` column on the `Accounts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('NPR', 'USD');

-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'NPR';
