/*
  Warnings:

  - Added the required column `productId` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Order_id_seq";

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN "productId" INTEGER NOT NULL DEFAULT 0;
