import type { WeatherCondition } from "../types/weather";

export function getWeatherCondition(
  weatherCode: number
): WeatherCondition {
  if (weatherCode === 0) {
    return "Clear Sky";
  }

  if (weatherCode === 1) {
    return "Mainly Clear";
  }

  if (weatherCode === 2) {
    return "Partly Cloudy";
  }

  if (weatherCode === 3) {
    return "Overcast";
  }

  if ([45, 48].includes(weatherCode)) {
    return "Fog";
  }

  if ([51, 53, 55, 56, 57].includes(weatherCode)) {
    return "Drizzle";
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return "Rain";
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return "Snow";
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return "Thunderstorm";
  }

  return "Unknown";
}
export function getWeatherIcon(weatherCode: number): string {
  if (weatherCode === 0) {
    return "☀️";
  }

  if ([1, 2].includes(weatherCode)) {
    return "🌤️";
  }

  if (weatherCode === 3) {
    return "☁️";
  }

  if ([45, 48].includes(weatherCode)) {
    return "🌫️";
  }

  if ([51, 53, 55, 56, 57].includes(weatherCode)) {
    return "🌦️";
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return "🌧️";
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return "❄️";
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return "⛈️";
  }

  return "🌡️";
}