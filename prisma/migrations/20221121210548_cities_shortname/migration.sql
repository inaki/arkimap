/*
  Warnings:

  - A unique constraint covering the columns `[shortName]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "City_shortName_key" ON "City"("shortName");
