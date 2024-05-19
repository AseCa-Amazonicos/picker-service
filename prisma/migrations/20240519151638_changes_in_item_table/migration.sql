/*
  Warnings:

  - Added the required column `itemId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "itemId" INTEGER NOT NULL DEFAULT 0;
