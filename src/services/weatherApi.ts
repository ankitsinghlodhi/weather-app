import type {
  GeocodingApiResponse,
  WeatherApiResponse,
} from "../types/weather";

export async function getWeather(
  latitude: number,
  longitude: number
): Promise<WeatherApiResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data: WeatherApiResponse = await response.json();

  return data;
}

export async function searchCity(
  city: string
): Promise<GeocodingApiResponse> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1&language=en&format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to search city");
  }

  const data: GeocodingApiResponse = await response.json();

  return data;
}