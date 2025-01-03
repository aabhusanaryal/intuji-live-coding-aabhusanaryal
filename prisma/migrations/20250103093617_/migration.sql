/*
  Warnings:

  - You are about to drop the column `locationsId` on the `AirQuality` table. All the data in the column will be lost.
  - You are about to drop the column `locationsId` on the `WeatherForecast` table. All the data in the column will be lost.
  - You are about to drop the column `locationsId` on the `WeatherRealtime` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locationId]` on the table `AirQuality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locationId]` on the table `WeatherRealtime` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationId` to the `AirQuality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `WeatherForecast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `WeatherRealtime` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AirQuality" DROP CONSTRAINT "AirQuality_locationsId_fkey";

-- DropForeignKey
ALTER TABLE "WeatherForecast" DROP CONSTRAINT "WeatherForecast_locationsId_fkey";

-- DropForeignKey
ALTER TABLE "WeatherRealtime" DROP CONSTRAINT "WeatherRealtime_locationsId_fkey";

-- DropIndex
DROP INDEX "AirQuality_locationsId_key";

-- DropIndex
DROP INDEX "WeatherRealtime_locationsId_key";

-- AlterTable
ALTER TABLE "AirQuality" DROP COLUMN "locationsId",
ADD COLUMN     "locationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WeatherForecast" DROP COLUMN "locationsId",
ADD COLUMN     "locationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WeatherRealtime" DROP COLUMN "locationsId",
ADD COLUMN     "locationId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AirQuality_locationId_key" ON "AirQuality"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "WeatherRealtime_locationId_key" ON "WeatherRealtime"("locationId");

-- AddForeignKey
ALTER TABLE "WeatherRealtime" ADD CONSTRAINT "WeatherRealtime_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeatherForecast" ADD CONSTRAINT "WeatherForecast_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AirQuality" ADD CONSTRAINT "AirQuality_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
