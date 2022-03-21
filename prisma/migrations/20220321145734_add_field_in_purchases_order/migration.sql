/*
  Warnings:

  - Added the required column `full_name` to the `purchase_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `purchase_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `purchase_order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchase_order" ADD COLUMN     "full_name" VARCHAR(180) NOT NULL,
ADD COLUMN     "orderComments" TEXT,
ADD COLUMN     "payment_method" VARCHAR(80) NOT NULL,
ADD COLUMN     "phone_number" VARCHAR(180) NOT NULL,
ADD COLUMN     "promotional_code" VARCHAR(80);
