import React, { useState } from "react";
import "../../src/Styles/Weather.css";

function Weather() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({});
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchWeather = async () => {
    if (!location.trim()) {
      alert("Please enter a location!");
      return;
    }

    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`
      );
      const data = await response.json();
      console.log("API data:", data);
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  //destructuring the data to the api
  const { temp, conditions, humidity, windspeed, winddir, precip, uvindex, sunrise, sunset } =
    weather.currentConditions || {};

  const fahrenheit = temp ? (temp * 9) / 5 + 32 : null;

 
  const getWindDirection = (degree) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round((degree % 360) / 22.5);
    return directions[index % 16];
  };
 // chnaging theme based on weather condition
  const getWeatherTheme = (condition) => {
    if (!condition) return "default-bg";
    const c = condition.toLowerCase();
    if (c.includes("clear") || c.includes("sunny")) return "sunny-bg";
    if (c.includes("rain")) return "rainy-bg";
    if (c.includes("cloud")) return "cloudy-bg";
    if (c.includes("snow")) return "snowy-bg";
    if (c.includes("thunder") || c.includes("storm")) return "stormy-bg";
    if (c.includes("fog") || c.includes("mist")) return "foggy-bg";
    return "default-bg";
  };


 const getDashboardClass = (condition) => {
    if (!condition) return "dashboard-clear";
    const c = condition.toLowerCase();
    if (c.includes("rain")) return "dashboard-rain";
    if (c.includes("cloud")) return "dashboard-cloudy";
    if (c.includes("storm") || c.includes("thunder")) return "dashboard-storm";
    if (c.includes("snow")) return "dashboard-snow";
    if (c.includes("fog") || c.includes("mist")) return "dashboard-fog";
    return "dashboard-clear";
  };

//changing the dynamicaly icons based weather condition
const getWeatherEmoji = (condition) => {
  if (!condition) return "🌤️"; // default

  const lower = condition.toLowerCase();

  if (lower.includes("clear") || lower.includes("sun")) return "☀️";
  if (lower.includes("cloud")) return "☁️";
  if (lower.includes("rain")) return "🌧️";
  if (lower.includes("storm") || lower.includes("thunder")) return "🌩️";
  if (lower.includes("snow")) return "❄️";
  if (lower.includes("fog") || lower.includes("mist") || lower.includes("haze")) return "🌫️";
  if (lower.includes("wind")) return "🌬️";

  return "🌤️"; // fallback
};

//dynamic dashboard background change
 const dashboardClass = getDashboardClass(conditions);




  const themeClass = getWeatherTheme(conditions);

  return (
    <div className={`Container ${themeClass}`}>
      <div className="search-bar">
        <input
          type="text"
          value={location}
          placeholder="Enter city name"
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {weather.resolvedAddress && (
        <div className={`weather-dashboard ${dashboardClass}`}>
          <h2 className="city-name">{weather.resolvedAddress}</h2>
          <p className="weather-summary">{weather.description}</p>

          <div className="weather-grid">
            <div className="weather-box condition">
              <p>{getWeatherEmoji(weather.currentConditions.conditions)} Condition</p>
           <h3>{weather.currentConditions.conditions}</h3>
            </div>

            <div className="weather-box temp-c">
              <p>🌡️ Temp (°C)</p>
              <h3>{temp}°C</h3>
            </div>

            <div className="weather-box temp-f">
              <p>🔥 Temp (°F)</p>
              <h3>{fahrenheit?.toFixed(1)}°F</h3>
            </div>

            <div className="weather-box humidity">
              <p>💧 Humidity</p>
              <h3>{humidity}%</h3>
            </div>

            <div className="weather-box wind-speed">
              <p>💨 Wind Speed</p>
              <h3>{windspeed} km/h</h3>
            </div>

            <div className="weather-box wind-dir">
              <p>🧭 Wind Direction</p>
              <h3>{winddir ? `${getWindDirection(winddir)} (${winddir}°)` : "N/A"}</h3>
            </div>

            <div className="weather-box rain">
              <p>🌧️ Rain Rate</p>
              <h3>{precip ? `${precip} mm/hr` : "0 mm/hr"}</h3>
            </div>

            <div className="weather-box uv">
              <p>☀️ UV Index</p>
              <h3>{uvindex}</h3>
            </div>

            <div className="weather-box air">
              <p>🌫️ Air Quality</p>
              <h3>{weather.currentConditions?.aqi || "N/A"}</h3>
            </div>

            <div className="weather-box sunrise">
              <p>🌅 Sunrise</p>
              <h3>{sunrise}</h3>
            </div>

            <div className="weather-box sunset">
              <p>🌇 Sunset</p>
              <h3>{sunset}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
