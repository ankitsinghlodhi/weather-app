import { useState } from "react";
import "./App.css";

import { getWeather, searchCity } from "./services/weatherApi";
import type {
  LocationData,
  WeatherData,
} from "./types/weather";

import {
  getWeatherCondition,
  getWeatherIcon,
} from "./utils/weatherUtils";

function App() {
  const [city, setCity] = useState<string>("");
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const locationData = await searchCity(city);

      if (
        !locationData.results ||
        locationData.results.length === 0
      ) {
        throw new Error("City not found");
      }

      const foundLocation = locationData.results[0];

      setLocation(foundLocation);

      const data = await getWeather(
        foundLocation.latitude,
        foundLocation.longitude
      );

      const weatherData: WeatherData = {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        weatherCode: data.current.weather_code,
        feelsLike: data.current.apparent_temperature,
      };

      setWeather(weatherData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <div className="weather-dashboard">

        {/* Header */}
        <header className="topbar">
          <div className="brand">
            <div className="brand-icon">✦</div>
            <span>Atmos</span>
          </div>

         {weather && (
  <div className="search-wrapper">
    <div className="search-icon">⌕</div>

    <input
      type="text"
      placeholder="Search city..."
      value={city}
      onChange={(e) => setCity(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      }}
    />

    <button
      className="search-button"
      onClick={handleSearch}
      disabled={loading}
    >
      {loading ? "..." : "Search"}
    </button>
  </div>
)}
        </header>

        {error && (
          <div className="error-message">
            <span>⚠</span>
            {error}
          </div>
        )}

        {!weather && !loading && !error && (
  <section className="landing">

    <div className="landing-atmosphere">
      <div className="sun"></div>
      <div className="cloud cloud-one"></div>
      <div className="cloud cloud-two"></div>
    </div>

    <div className="landing-content">

      <div className="eyebrow">
        <span className="eyebrow-dot"></span>
        LIVE WEATHER
      </div>

      <h1>
        Know your
        <br />
        <span>sky.</span>
      </h1>

      <p className="landing-description">
        Real-time weather conditions, forecasts and
        atmospheric insights for anywhere in the world.
      </p>

      <div className="hero-search">

        <span className="hero-search-icon">⌕</span>

        <input
          type="text"
          placeholder="Search a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Explore"}
          <span>→</span>
        </button>

      </div>

      <div className="location-option">
        <span>◎</span>
        Search any city worldwide
      </div>

    </div>

    <div className="landing-cities">

      <span>POPULAR</span>

      <button onClick={() => {
        setCity("London");
      }}>
        London
      </button>

      <button onClick={() => {
        setCity("Tokyo");
      }}>
        Tokyo
      </button>

      <button onClick={() => {
        setCity("New York");
      }}>
        New York
      </button>

      <button onClick={() => {
        setCity("Dubai");
      }}>
        Dubai
      </button>

    </div>

    <div className="landing-features">

      <div className="landing-feature">
        <span>01</span>
        <div>
          <strong>Real-time</strong>
          <p>Current conditions</p>
        </div>
      </div>

      <div className="landing-feature">
        <span>02</span>
        <div>
          <strong>Global coverage</strong>
          <p>Weather anywhere</p>
        </div>
      </div>

      <div className="landing-feature">
        <span>03</span>
        <div>
          <strong>Precise data</strong>
          <p>Atmospheric details</p>
        </div>
      </div>

    </div>

  </section>
)}

        {loading && (
          <section className="loading-state">
            <div className="loader"></div>
            <p>Fetching weather data...</p>
          </section>
        )}

        {weather && location && !loading && (
          <section className="weather-content">

            {/* Main Weather */}
            <div className="hero-weather">

              <div className="location">
                <span className="location-pin">●</span>

                <div>
                  <h2>{location.name}</h2>
                  <p>{location.country}</p>
                </div>
              </div>

              <div className="weather-main">

                <div className="weather-icon">
                  {getWeatherIcon(weather.weatherCode)}
                </div>

                <div className="temperature">
                  <span>{Math.round(weather.temperature)}</span>
                  <sup>°C</sup>
                </div>

              </div>

              <div className="condition">
                <span>
                  {getWeatherCondition(weather.weatherCode)}
                </span>

                <p>
                  Feels like {Math.round(weather.feelsLike)}°C
                </p>
              </div>

            </div>

            {/* Details */}
            <div className="details-grid">

              <div className="detail-card">
                <div className="detail-top">
                  <span className="detail-icon">💧</span>
                  <span>Humidity</span>
                </div>

                <strong>{weather.humidity}%</strong>

                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${weather.humidity}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-top">
                  <span className="detail-icon">〰</span>
                  <span>Wind Speed</span>
                </div>

                <strong>
                  {Math.round(weather.windSpeed)}
                  <small> km/h</small>
                </strong>

                <p>Current wind</p>
              </div>

              <div className="detail-card">
                <div className="detail-top">
                  <span className="detail-icon">🌡</span>
                  <span>Feels Like</span>
                </div>

                <strong>
                  {Math.round(weather.feelsLike)}°
                </strong>

                <p>Apparent temperature</p>
              </div>

            </div>

            {/* Footer */}
            <div className="dashboard-footer">
              <span>
                Live weather data
              </span>

              <span className="status">
                <i></i>
                Updated just now
              </span>
            </div>

          </section>
        )}

      </div>
    </main>
  );
}

export default App;