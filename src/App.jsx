import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import getWeatherBg from "./temp/getWeatherBg"; // Make sure this file exists

const API_KEY = "6ef183cae4d95100c9fe637f936be6c8";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("C");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bgClass, setBgClass] = useState("bg-gradient-to-b from-slate-800 to-slate-900");

  const toggleUnit = () => setUnit((u) => (u === "C" ? "F" : "C"));

  const fetchWeather = async (city) => {
    if (!city?.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      setBgClass(getWeatherBg(res.data.weather[0].main));
    } catch (e) {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      setBgClass(getWeatherBg(res.data.weather[0].main));
    } catch (e) {
      setError("Could not get weather for your location.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.warn("Location access denied. Using search instead.");
        }
      );
    }
  }, []);

  return (
    <div className={`min-h-screen relative transition-all duration-500 ${bgClass}`}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="min-h-screen text-white p-4 max-w-4xl mx-auto space-y-6">
        {/* Header + Unit Toggle */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">CLOUDIFY</h1>
          <button
            onClick={toggleUnit}
            className="px-4 py-2 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 shadow hover:bg-white/25 transition"
          >
            Toggle °{unit === "C" ? "F" : "C"}
          </button>
        </div>

        {/* Search */}
        <div className="bg-black/20 rounded-xl p-4">
          <SearchBar onSearch={fetchWeather} loading={loading} />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-400/30 text-red-200 p-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 animate-pulse">
            <div className="h-6 bg-white/20 rounded w-1/3 mb-3"></div>
            <div className="h-8 bg-white/20 rounded w-1/2 mb-4"></div>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-16 bg-white/15 rounded"></div>
              <div className="h-16 bg-white/15 rounded"></div>
              <div className="h-16 bg-white/15 rounded"></div>
            </div>
          </div>
        )}

        {/* Weather Card */}
        {weather && !loading && (
          <div className="bg-black/20 rounded-xl p-4">
            <WeatherCard data={weather} unit={unit} />
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
