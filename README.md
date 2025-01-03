# Weather API

This is a mock API that returns fake weather data

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
