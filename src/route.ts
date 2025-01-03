import * as http from "http";
import LocationsController from "./weather/locations.controller";
const url = require("url");
module.exports = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
      const reqUrl = url.parse(req.url, true);
      // GET endpoint

      if (reqUrl.pathname == "/weather/locations" && req.method === "GET") {
        LocationsController.getLocations(req, res);
      } else if (
        reqUrl.pathname == "/weather/realtime" &&
        req.method === "GET"
      ) {
        LocationsController.getRealtime(req, res);
      } else if (
        reqUrl.pathname == "/weather/forecast" &&
        req.method === "GET"
      ) {
        LocationsController.getForecast(req, res);
      } else if (
        reqUrl.pathname == "/weather/airquality" &&
        req.method === "GET"
      ) {
        LocationsController.getAQ(req, res);
      }

      // POST endpoint
      else if (
        reqUrl.pathname == "/weather/generate" &&
        req.method === "POST"
      ) {
        LocationsController.generate(req, res);
      }
      //   else if (
      //     reqUrl.pathname == "/weather/locations" &&
      //     req.method === "POST"
      //   ) {
      //     LocationsController.postLocation(req, res);
      //   }
      // 404 response
      else {
        var response = {
          message: "The requested URI doesn't exist on the server.",
        };
        res.statusCode = 404;
        res.setHeader("content-Type", "Application/json");
        res.end(JSON.stringify(response));
      }
    } catch (e) {
      return500(res);
    }
  }
);

export const return500 = (res: http.ServerResponse) => {
  res.statusCode = 500;
  res.setHeader("content-Type", "Application/json");

  res.end(JSON.stringify({ message: "Something bad happened!" }));
};
export const return400 = (res: http.ServerResponse, msg?: string) => {
  res.statusCode = 400;
  res.setHeader("content-Type", "Application/json");

  res.end(
    JSON.stringify({ message: msg ?? "Check if the request is correct!" })
  );
};
