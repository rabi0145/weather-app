import { useState, useCallback } from "react";

/**
 * Custom hook to fetch weather data from OpenWeatherMap API
 * Handles current weather, 5-day forecast, and loading/error states
 */
export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  /**
   * Fetch weather by city name
   */
  const fetchWeatherByCity = useCallback(
    async (city) => {
      if (!city.trim()) {
        setError("Please enter a city name");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch current weather
        const currentRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
        );

        if (!currentRes.ok) {
          if (currentRes.status === 404) {
            throw new Error("City not found. Please try another.");
          }
          throw new Error("Failed to fetch weather data");
        }

        const currentData = await currentRes.json();

        // Fetch 5-day forecast
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`,
        );

        if (!forecastRes.ok) {
          throw new Error("Failed to fetch forecast data");
        }

        const forecastData = await forecastRes.json();

        setCurrentWeather(currentData);
        setForecast(forecastData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCurrentWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    },
    [API_KEY],
  );

  /**
   * Fetch weather by coordinates (for geolocation)
   */
  const fetchWeatherByCoords = useCallback(
    async (latitude, longitude) => {
      setLoading(true);
      setError(null);

      try {
        // Fetch current weather
        const currentRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
        );

        if (!currentRes.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const currentData = await currentRes.json();

        // Fetch 5-day forecast
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
        );

        if (!forecastRes.ok) {
          throw new Error("Failed to fetch forecast data");
        }

        const forecastData = await forecastRes.json();

        setCurrentWeather(currentData);
        setForecast(forecastData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCurrentWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    },
    [API_KEY],
  );

  return {
    currentWeather,
    forecast,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    setError,
  };
};
