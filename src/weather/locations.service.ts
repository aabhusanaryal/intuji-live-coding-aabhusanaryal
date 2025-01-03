import prisma from "../prisma/prisma.service";
import { return400 } from "../route";

export default class LocationsService {
  static async fetchAll() {
    // This function fetches all locations from db
    let locations = await prisma.locations.findMany();
    console.log("Locations", locations);
    return locations;
  }

  static async fetchRealtimeWeather(location: string) {
    let givenLocation = await prisma.locations.findFirst({
      where: {
        name: location,
      },
    });
    if (givenLocation) {
      let realtimeWeather = await prisma.weatherRealtime.findFirst({
        where: {
          locationId: givenLocation.id,
        },
      });
      console.log("Realtime", realtimeWeather);
      return realtimeWeather;
    } else {
      return null;
    }
  }
  static async fetchAirQuality() {}
  static async fetchForecast() {}
}
