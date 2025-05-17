/*
  Warnings:

  - You are about to drop the column `soutcome` on the `orders` table. All the data in the column will be lost.
  - Added the required column `outcome` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "soutcome",
ADD COLUMN     "outcome" "Outcome" NOT NULL;
