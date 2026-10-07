export interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  feelsLike: number;
}

export interface WeatherApiResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
  };
}

export interface GeocodingApiResponse {
  results: LocationData[];
}

export type WeatherCondition =
  | "Clear Sky"
  | "Mainly Clear"
  | "Partly Cloudy"
  | "Overcast"
  | "Fog"
  | "Drizzle"
  | "Rain"
  | "Snow"
  | "Thunderstorm"
  | "Unknown";