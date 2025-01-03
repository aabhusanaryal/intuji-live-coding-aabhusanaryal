/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Locations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT,

    CONSTRAINT "Locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherRealtime" (
    "id" SERIAL NOT NULL,
    "locationsId" INTEGER NOT NULL,
    "temperature" DECIMAL(65,30) NOT NULL,
    "condition" TEXT NOT NULL,
    "humidity" INTEGER NOT NULL,
    "windSpeed" DECIMAL(65,30) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeatherRealtime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherForecast" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minTemp" DECIMAL(65,30) NOT NULL,
    "maxTemp" DECIMAL(65,30) NOT NULL,
    "condition" TEXT NOT NULL,
    "locationsId" INTEGER NOT NULL,

    CONSTRAINT "WeatherForecast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AirQuality" (
    "id" SERIAL NOT NULL,
    "aqi" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "locationsId" INTEGER NOT NULL,

    CONSTRAINT "AirQuality_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeatherRealtime_locationsId_key" ON "WeatherRealtime"("locationsId");

-- CreateIndex
CREATE UNIQUE INDEX "AirQuality_locationsId_key" ON "AirQuality"("locationsId");

-- AddForeignKey
ALTER TABLE "WeatherRealtime" ADD CONSTRAINT "WeatherRealtime_locationsId_fkey" FOREIGN KEY ("locationsId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeatherForecast" ADD CONSTRAINT "WeatherForecast_locationsId_fkey" FOREIGN KEY ("locationsId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AirQuality" ADD CONSTRAINT "AirQuality_locationsId_fkey" FOREIGN KEY ("locationsId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
