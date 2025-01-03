import prisma from "../prisma/prisma.service";
import { return400 } from "../route";
import { cities } from "../utils/city-list";
import {
  generateRandomAirQuaility,
  generateRandomCity,
  generateRandomDate,
  generateRandomNumber,
  generateRandomRealtimeWeather,
  generateRandomWeatherForecast,
  generateRandomWeatherForecasts,
} from "../utils/random";
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
  static async fetchAirQuality(location: string) {
    let givenLocation = await prisma.locations.findFirst({
      where: {
        name: location,
      },
      select: {
        AirQuality: true,
      },
    });
    if (!givenLocation) return null;
    return givenLocation.AirQuality;
  }
  static async fetchForecast(location: string) {
    let givenLocation = await prisma.locations.findFirst({
      where: {
        name: location,
      },
      select: {
        WeatherForecast: true,
      },
    });
    if (!givenLocation) return null;
    return givenLocation.WeatherForecast;
  }
  static async generate() {
    const randomCity = generateRandomCity();

    const generated = await prisma.locations.create({
      data: {
        name: randomCity.name,
        latitude: randomCity.lat,
        longitude: randomCity.lon,
        WeatherRealtime: {
          create: generateRandomRealtimeWeather(),
        },
        WeatherForecast: {
          createMany: {
            data: generateRandomWeatherForecasts(),
          },
        },
        AirQuality: {
          create: generateRandomAirQuaility(),
        },
      },
      include: {
        WeatherForecast: true,
        WeatherRealtime: true,
        AirQuality: true,
      },
    });

    return generated;
  }
}
