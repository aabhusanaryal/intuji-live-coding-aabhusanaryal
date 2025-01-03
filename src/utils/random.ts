import { cities } from "./city-list";

const conditions = ["Good", "Bad", "Fair", "Moderate"];

export const generateRandomNumber = (min: number, max: number): number =>
  Math.random() * (max - min + 1) + min;

export const generateRandomDate = (from: Date, to: Date) => {
  return new Date(
    from.getTime() + Math.random() * (to.getTime() - from.getTime())
  );
};

export const generateRandomCity = () => {
  const randomIndex = Math.floor(generateRandomNumber(0, cities.length - 1));
  const randomCity = cities[randomIndex];
  return randomCity;
};

export const generateRandomRealtimeWeather = () => {
  return {
    temperature: generateRandomNumber(5, 50),
    condition:
      conditions[Math.floor(generateRandomNumber(0, conditions.length - 1))],
    humidity: generateRandomNumber(40, 60),
    windSpeed: generateRandomNumber(40, 150),
  };
};

export const generateRandomWeatherForecast = () => {
  return {
    minTemp: generateRandomNumber(5, 50),
    maxTemp: generateRandomNumber(5, 50),
    date: generateRandomDate(new Date(), new Date(new Date().getDate() + 10)),
    condition:
      conditions[Math.floor(generateRandomNumber(0, conditions.length - 1))],
  };
};

export const generateRandomWeatherForecasts = () => {
  const forecasts = [];
  for (let i = 0; i < generateRandomNumber(2, 10); i++) {
    forecasts.push(generateRandomWeatherForecast());
  }
  return forecasts;
};

export const generateRandomAirQuaility = () => {
  return {
    aqi: generateRandomNumber(200, 700),
    description:
      conditions[Math.floor(generateRandomNumber(0, conditions.length - 1))],
  };
};
