import { IncomingMessage, ServerResponse } from "http";
import LocationsService from "./locations.service";
import { return400, return500 } from "../route";
const url = require("url");

export default class LocationsController {
  static async getLocations(req: IncomingMessage, res: ServerResponse) {
    const locations = await LocationsService.fetchAll();
    const response = { message: "Locations fetched successfully", locations };
    res.statusCode = 200;
    res.setHeader("content-Type", "Application/json");
    res.end(JSON.stringify(response));
  }

  static async getRealtime(req: IncomingMessage, res: ServerResponse) {
    // Extracting the query param
    const reqUrl = url.parse(req.url, true);
    const queryParams = reqUrl.query;
    if (!queryParams["location"]) {
      return return400(res, "Location is required in query string");
    }

    const realtimeWeather = await LocationsService.fetchRealtimeWeather(
      queryParams.location
    );

    console.log("Realtime Weather", realtimeWeather);

    if (realtimeWeather == null) {
      return return400(res, "Realtime weather data not found");
    }
    const response = {
      message: "Realtime weather fetched successfully",
      realtime_weather: { location: queryParams.location, ...realtimeWeather },
    };
    res.statusCode = 200;
    res.setHeader("content-Type", "Application/json");
    res.end(JSON.stringify(response));
  }
  static async getForecast(req: IncomingMessage, res: ServerResponse) {
    const forecast = await LocationsService.fetchForecast();
    const response = {
      message: "Weather forecast fetched successfully",
      forecast,
    };
    res.statusCode = 200;
    res.setHeader("content-Type", "Application/json");
    res.end(JSON.stringify(response));
  }
  static async getAQ(req: IncomingMessage, res: ServerResponse) {
    const airQuality = await LocationsService.fetchAirQuality();
    const response = {
      message: "Air Quality weather fetched successfully",
      airquality: airQuality,
    };
    res.statusCode = 200;
    res.setHeader("content-Type", "Application/json");
    res.end(JSON.stringify(response));
  }
  static async generate(req: IncomingMessage, res: ServerResponse) {
    const generated = await LocationsService.generate();
    const response = { message: "Mock data generated", data: generated };
    res.statusCode = 200;
    res.setHeader("content-Type", "Application/json");
    res.end(JSON.stringify(response));
  }

  //   static async postLocation(req: IncomingMessage, res: ServerResponse) {
  //     let body = "";
  //     req.on("data", (chunk) => {
  //       body += chunk;
  //     });
  //     req.on("end", () => {
  //       try {
  //         let postBody = JSON.parse(body);
  //         const response = { message: "Location added successfully" };

  //         res.statusCode = 201;
  //         res.setHeader("content-Type", "Application/json");
  //         res.end(JSON.stringify(response));
  //       } catch (e) {
  //         return return500(res);
  //       }
  //     });
  //   }
}
