import prisma from "../prisma/prisma.service";
import { return400 } from "../route";
import { cities } from "../utils/city-list";
import { generateRandomDate, generateRandomNumber } from "../utils/rng";
export default class LocationsService {
  static async fetchAll() {
    // This function fetches all locations from db
    let locations = await prisma.locations.findMany();
    return locations;
  }

  static async fetchRealtimeWeather(location: string) {
    let givenLocation = await prisma.locations.findFirst({
      where: {
        name: location,
      },
      select: {
        WeatherRealtime: true,
      },
    });
    if (!givenLocation) return null;
    return givenLocation.WeatherRealtime;
  }
  static async fetchAirQuality() {}
  static async fetchForecast() {}
  static async generate() {
    const conditions = ["Good", "Bad", "Fair", "Moderate"];
    const randomIndex = Math.floor(generateRandomNumber(0, cities.length - 1));
    const randomCity = cities[randomIndex];
    const generated = await prisma.locations.create({
      data: {
        name: randomCity.name,
        latitude: randomCity.lat,
        longitude: randomCity.lon,
        WeatherRealtime: {
          create: {
            temperature: generateRandomNumber(5, 50),
            condition:
              conditions[
                Math.floor(generateRandomNumber(0, conditions.length - 1))
              ],
            humidity: generateRandomNumber(40, 60),
            windSpeed: generateRandomNumber(40, 150),
          },
        },
        WeatherForecast: {
          createMany: {
            data: [
              {
                minTemp: generateRandomNumber(5, 50),
                maxTemp: generateRandomNumber(5, 50),
                date: generateRandomDate(
                  new Date(),
                  new Date(new Date().getDate() + 10)
                ),
                condition:
                  conditions[
                    Math.floor(generateRandomNumber(0, conditions.length))
                  ],
              },
            ],
          },
        },
      },
      include: {
        WeatherForecast: true,
        WeatherRealtime: true,
      },
    });

    return generated;
  }
}
