/*
  Warnings:

  - A unique constraint covering the columns `[zip_code]` on the table `available_locations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "available_locations_zip_code_key" ON "available_locations"("zip_code");
