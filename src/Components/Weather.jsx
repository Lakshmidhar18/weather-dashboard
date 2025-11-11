import React, { useState,useEffect} from 'react';
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
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    if (weather && weather.address) {
      console.log("Weather data:", weather);
    }
  }, [weather]);


  return (
    <div className="Container">
      <div className="search-bar">
        <input
          type="text"
          value={location}
          placeholder="Enter city name"
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
        
      </div>
     

      <div className="container">
        <h1>Weather Info</h1>
      
      

      </div>
    </div>
  );
}

export default Weather;
