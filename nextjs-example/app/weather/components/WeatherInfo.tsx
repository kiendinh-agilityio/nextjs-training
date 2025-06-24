"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  current_weather: {
    temperature: number;
    windspeed: number;
    time: string;
    weathercode: number;
    is_day: number;
    winddirection: number;
    interval: number;
  };
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

const WeatherInfo = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("/api/weather");

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <div className="animate-pulse">Loading weather data...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>No weather data available</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Current Weather (Ho Chi Minh City)
      </h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold">
            {weatherData.current_weather.temperature}°C
          </p>
          <p className="text-gray-600">
            Windspeed: {weatherData.current_weather.windspeed} km/h
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
