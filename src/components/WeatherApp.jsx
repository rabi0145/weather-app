import { useEffect, useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import { useGeolocation } from '../hooks/useGeolocation';
import { useTemperatureUnit } from '../hooks/useTemperatureUnit';
import { SearchBar } from './SearchBar';
import { WeatherSkeleton } from './WeatherSkeleton';
import { Toast } from './Toast';

/**
 * Main Weather App Component
 * Fetches and displays current weather and 5-day forecast
 */
export const WeatherApp = () => {
  const { currentWeather, forecast, loading, error, fetchWeatherByCity, fetchWeatherByCoords, setError } = useWeather();
  const { location, locationError, isGettingLocation, getLocation } = useGeolocation();
  const { unit, convertTemp, getTempSymbol, toggleUnit } = useTemperatureUnit();
  const [toast, setToast] = useState(null);

  // Auto-fetch location on component mount
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  // Fetch weather on location change
  useEffect(() => {
    if (location) {
      fetchWeatherByCoords(location.latitude, location.longitude);
    }
  }, [location, fetchWeatherByCoords]);

  // Display location error as toast
  useEffect(() => {
    if (locationError) {
      setToast({ message: locationError, type: 'info' });
    }
  }, [locationError]);

  // Display API errors as toast
  useEffect(() => {
    if (error) {
      setToast({ message: error, type: 'error' });
    }
  }, [error]);

  /**
   * Get weather icon URL from OpenWeatherMap
   */
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  /**
   * Format date for forecast
   */
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  /**
   * Group forecast by date (one entry per day)
   */
  const getGroupedForecast = () => {
    if (!forecast) return [];

    const grouped = {};
    forecast.list.forEach((item) => {
      const date = formatDate(item.dt);
      if (!grouped[date]) {
        grouped[date] = item;
      }
    });

    return Object.values(grouped).slice(0, 5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-900 to-gray-950 p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-pink-500 to-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
            Weather App
          </h1>
          <p className="text-lg text-gray-300 font-semibold tracking-wide">Get weather updates in neon style ⚡</p>
        </div>

        {/* Controls */}
        <div className="bg-gradient-to-r from-gray-900/80 to-purple-900/80 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-cyan-500/30 shadow-2xl shadow-purple-500/20">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <SearchBar onSearch={fetchWeatherByCity} isLoading={loading} />
            </div>

            <button
              onClick={getLocation}
              disabled={isGettingLocation || loading}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:scale-105 shadow-lg shadow-cyan-500/50 whitespace-nowrap"
            >
              {isGettingLocation ? '⏳ Getting...' : '📍 My Location'}
            </button>
          </div>

          {/* Temperature Unit Toggle */}
          {currentWeather && (
            <button
              onClick={toggleUnit}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-lg hover:from-pink-400 hover:to-purple-400 transition transform hover:scale-105 shadow-lg shadow-pink-500/50"
            >
              Switch to {unit === 'metric' ? '°F' : '°C'}
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && <WeatherSkeleton />}

        {/* Current Weather */}
        {!loading && currentWeather && (
          <div className="bg-gradient-to-br from-gray-900/90 to-purple-900/90 backdrop-blur-xl rounded-2xl p-8 mb-6 text-white border border-pink-500/30 shadow-2xl shadow-pink-500/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                  {currentWeather.name}
                </h2>
                <p className="text-gray-300 capitalize text-lg font-semibold mt-2">
                  {currentWeather.weather[0].description}
                </p>
              </div>
              <img
                src={getWeatherIcon(currentWeather.weather[0].icon)}
                alt="weather icon"
                className="w-28 h-28 drop-shadow-lg"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-500/50 backdrop-blur-sm">
                <p className="text-gray-300 text-sm font-semibold uppercase tracking-wider">Temperature</p>
                <p className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mt-2">
                  {convertTemp(currentWeather.main.temp)}{getTempSymbol()}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-pink-500/50 backdrop-blur-sm">
                <p className="text-gray-300 text-sm font-semibold uppercase tracking-wider">Feels Like</p>
                <p className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
                  {convertTemp(currentWeather.main.feels_like)}{getTempSymbol()}
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl p-4 border border-yellow-500/50 backdrop-blur-sm">
                <p className="text-gray-300 text-sm font-semibold uppercase tracking-wider">Humidity</p>
                <p className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mt-2">
                  {currentWeather.main.humidity}%
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-emerald-500/50 backdrop-blur-sm">
                <p className="text-gray-300 text-sm font-semibold uppercase tracking-wider">Wind Speed</p>
                <p className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mt-2">
                  {currentWeather.wind.speed} m/s
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5-Day Forecast */}
        {!loading && forecast && (
          <div className="bg-gradient-to-r from-gray-900/90 to-purple-900/90 backdrop-blur-xl rounded-2xl p-6 text-white border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-6">
              5-Day Forecast ⭐
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {getGroupedForecast().map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-purple-800/50 rounded-xl p-4 text-center border border-purple-500/50 hover:border-pink-500/50 backdrop-blur-sm transition transform hover:scale-110 hover:shadow-2xl hover:shadow-pink-500/30 cursor-pointer"
                >
                  <p className="font-bold text-cyan-400 mb-3 text-sm uppercase tracking-wider">{formatDate(item.dt)}</p>
                  <img
                    src={getWeatherIcon(item.weather[0].icon)}
                    alt="forecast icon"
                    className="w-14 h-14 mx-auto mb-3 drop-shadow-lg"
                  />
                  <p className="text-sm text-gray-300 capitalize mb-3 font-semibold">{item.weather[0].description}</p>
                  <p className="text-2xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {convertTemp(item.main.temp)}{getTempSymbol()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !currentWeather && (
          <div className="bg-gradient-to-r from-gray-900/90 to-purple-900/90 backdrop-blur-xl rounded-2xl p-12 text-center text-white border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              🔍 Search for a city or enable location to get started
            </p>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default WeatherApp;
