/*
  Warnings:

  - You are about to drop the `_PurchaseOrderToUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `users_id` to the `purchase_order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PurchaseOrderToUsers" DROP CONSTRAINT "_PurchaseOrderToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_PurchaseOrderToUsers" DROP CONSTRAINT "_PurchaseOrderToUsers_B_fkey";

-- AlterTable
ALTER TABLE "purchase_order" ADD COLUMN     "users_id" VARCHAR(80) NOT NULL;

-- DropTable
DROP TABLE "_PurchaseOrderToUsers";
