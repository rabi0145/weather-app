import { useState, useCallback } from 'react';

/**
 * Custom hook to manage temperature unit conversion
 */
export const useTemperatureUnit = () => {
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  /**
   * Convert temperature based on current unit
   */
  const convertTemp = useCallback((kelvin) => {
    if (unit === 'metric') {
      return Math.round(kelvin);
    } else {
      return Math.round((kelvin * 9) / 5 + 32);
    }
  }, [unit]);

  /**
   * Get temperature symbol
   */
  const getTempSymbol = useCallback(() => {
    return unit === 'metric' ? '°C' : '°F';
  }, [unit]);

  /**
   * Toggle between Celsius and Fahrenheit
   */
  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  }, []);

  return { unit, convertTemp, getTempSymbol, toggleUnit };
};