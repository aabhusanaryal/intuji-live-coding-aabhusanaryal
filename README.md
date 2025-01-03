# Weather API

This is a mock API that returns fake weather data

## Installation Steps

Create a postgres database using your preferred method and add the credentials in the `.env` file.

You can also create a postgres instance with Docker by running:

```bash
$ docker compose build

$ docker compose up -d
```

Then, install the dependencies with

```bash
$ npm i
```

Finally, run the project with

```bash
$ npm run dev
```

## Endpoints

### Locations

```
GET /weather/locations
```

Returns a list of all locations

### Realtime Weather

```
GET /weather/realtime?location=CITY
```

Returns the realtime location for the given city (passed as query param)

### Weather Forecast

```
GET /weather/forecast?location=CITY
```

Returns a list of forecasts for the provided city.

### Air Quality

```
GET /weather/airquality
```

Returns the air quality index, and a description for the given city.

### Generate Mock Data

```
POST /weather/generate
```

Generates and populates the db based on the city names provided in `/src/utils/city-list.ts`
