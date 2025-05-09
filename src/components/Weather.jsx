import React, { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import "../components/Weather.css";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const API_KEY = "50f029988174f9f05e59534ec6c54755"; //  API Key
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const cityQuery = query.get("city");

    if (cityQuery) {
      fetchWeather(cityQuery);
    } else {
      setIsSearching(false);
      setWeatherData(null);
    }
  }, [location.search]);

  //Fetch weather data
  const fetchWeather = async (queryCity) => {
    if (!queryCity) return;
    setIsSearching(true);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSearch = () => {
    if (city) {
      navigate(`?city=${city}`);
      fetchWeather(city);
    }
  };

  return (
    <div className="search-container">
      {!isSearching ? (
        <motion.div
          className="search-box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <input
            type="text"
            placeholder="Search for a city..."
            className="search-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <motion.button
            className="search-button"
            onClick={handleSearch}
          >
            <Search className="search-icon"/>
          </motion.button>
        </motion.div>
      ) : isLoading ? (
        <motion.div
          className="loader-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
        </motion.div>
      ) : weatherData ? (
        <motion.div
          className="weather-display"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1>{weatherData.name}</h1>
          <p>{weatherData.main.temp}°C</p>
          <p>{weatherData.weather[0].description}</p>
          
        </motion.div>
      ) : null}
    </div>
  );
};

export default Weather;
