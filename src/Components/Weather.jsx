// // // import React, { useEffect, useState } from "react";
// // // import "../../src/Styles/Weather.css";
// // // import Predicted from "./Predicted";
// // // import Loader from "./Loader";

// // // function Weather() {
// // //   const [location, setLocation] = useState("");
// // //   const [displayName, setDisplayName] = useState("");
// // //   const [weather, setWeather] = useState({});
// // //   const [error, setError] = useState(null);
// // //   const apiKey = import.meta.env.VITE_API_KEY;
// // //   const [Loading, setLoading] = useState(true);

  
// // //   const isCoordsString = (s) => {
// // //     if (!s || typeof s !== "string") return false;
// // //     return /^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/.test(s);
// // //   };

  
// // //   const getWindDirection = (degree) => {
// // //     if (degree == null) return null;
// // //     const directions = [
// // //       "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
// // //       "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
// // //     ];
// // //     const index = Math.round((degree % 360) / 22.5);
// // //     return directions[index % 16];
// // //   };

  
// // //   const getWeatherTheme = (condition) => {
// // //     if (!condition) return "default-bg";
// // //     const c = condition.toLowerCase();
// // //     if (c.includes("clear") || c.includes("sunny")) return "sunny-bg";
// // //     if (c.includes("rain")) return "rainy-bg";
// // //     if (c.includes("cloud")) return "cloudy-bg";
// // //     if (c.includes("snow")) return "snowy-bg";
// // //     if (c.includes("thunder") || c.includes("storm")) return "stormy-bg";
// // //     if (c.includes("fog") || c.includes("mist")) return "foggy-bg";
// // //     return "default-bg";
// // //   };

  
// // //   const getWeatherEmoji = (condition) => {
// // //     if (!condition) return "🌤";
// // //     const lower = condition.toLowerCase();
// // //     if (lower.includes("clear") || lower.includes("sun")) return "☀";
// // //     if (lower.includes("cloud")) return "☁";
// // //     if (lower.includes("rain")) return "🌧";
// // //     if (lower.includes("storm") || lower.includes("thunder")) return "🌩";
// // //     if (lower.includes("snow")) return "❄";
// // //     if (lower.includes("fog") || lower.includes("mist") || lower.includes("haze")) return "🌫";
// // //     if (lower.includes("wind")) return "🌬";
// // //     return "🌤";
// // //   };


// // //   const fetchWeather = () => {
// // //     if (!location.trim()) {
// // //       alert("Please enter a location!");
// // //       return;
// // //     }

// // //     setLoading(true);
    
// // //     setTimeout(async () => {
// // //       try {
// // //         const response = await fetch(
// // //           `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
// // //             location
// // //           )}?unitGroup=metric&key=${apiKey}&contentType=json`
// // //         );
// // //         if (!response.ok) throw new Error("Bad API Request");
// // //         const data = await response.json();

// // //         if (data?.resolvedAddress && !isCoordsString(data.resolvedAddress)) {
// // //           setDisplayName(data.resolvedAddress);
// // //           setLocation(data.resolvedAddress);
// // //         }

// // //         setWeather(data);
// // //       } catch (err) {
// // //         console.error("Error fetching weather:", err);
// // //         setError("Failed to fetch weather for the entered location.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     }, 2000);
// // //   };

  
// // //   const getAccurateCity = async (latVal, lonVal) => {
// // //     console.log("Getting city for coordinates:", latVal, lonVal);
    
// // //     try {
// // //       const locationIQResponse = await fetch(
// // //         `https://us1.locationiq.com/v1/reverse.php?key=pk.5e9c7e9e2c4d4c2c4d4c2c4d&lat=${latVal}&lon=${lonVal}&format=json&accept-language=en`
// // //       );
      
// // //       if (locationIQResponse.ok) {
// // //         const locationIQData = await locationIQResponse.json();
// // //         console.log("LocationIQ response:", locationIQData);
        
// // //         const addr = locationIQData.address || {};
        
// // //         let cityName = "";
        
// // //         if (addr.city) {
// // //           cityName = addr.city;
// // //           if (addr.county && !addr.county.includes("District")) {
// // //             cityName = `${addr.city}, ${addr.county}`;
// // //           } else if (addr.state) {
// // //             cityName = `${addr.city}, ${addr.state}`;
// // //           }
// // //         } 
// // //         else if (addr.town) {
// // //           cityName = addr.town;
// // //           if (addr.state) {
// // //             cityName = `${addr.town}, ${addr.state}`;
// // //           }
// // //         }
// // //         else if (addr.village) {
// // //           cityName = addr.village;
// // //           if (addr.state) {
// // //             cityName = `${addr.village}, ${addr.state}`;
// // //           }
// // //         }
// // //         else if (addr.suburb) {
// // //           cityName = addr.suburb;
// // //           if (addr.state) {
// // //             cityName = `${addr.suburb}, ${addr.state}`;
// // //           }
// // //         }
// // //         else if (addr.county) {
// // //           cityName = addr.county.replace(" District", "");
// // //           if (addr.state) {
// // //             cityName = `${addr.county.replace(" District", "")}, ${addr.state}`;
// // //           }
// // //         }
// // //         else if (addr.state_district) {
// // //           cityName = addr.state_district;
// // //           if (addr.state) {
// // //             cityName = `${addr.state_district}, ${addr.state}`;
// // //           }
// // //         }
// // //         else if (addr.state) {
// // //           cityName = addr.state;
// // //         }
        
// // //         if (cityName) {
// // //           console.log("Found city from LocationIQ:", cityName);
// // //           return cityName;
// // //         }
// // //       }
// // //     } catch (locationIQErr) {
// // //       console.log("LocationIQ failed:", locationIQErr);
// // //     }
    
// // //     try {
// // //       const googleResponse = await fetch(
// // //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latVal},${lonVal}&key=AIzaSyC2xQv04AcuLInoVQCLHPPm3WQ1pRXr4Nk`
// // //       );
      
// // //       if (googleResponse.ok) {
// // //         const googleData = await googleResponse.json();
// // //         console.log("Google Maps response:", googleData);
        
// // //         if (googleData.status === "OK" && googleData.results.length > 0) {
// // //           for (const result of googleData.results) {
// // //             const address = result.formatted_address;
            
// // //             if (address.includes("India")) {
// // //               const parts = address.split(",");
              
// // //               for (let i = 0; i < Math.min(3, parts.length); i++) {
// // //                 const part = parts[i].trim();
// // //                 if (!part.match(/^\d+$/) && !part.includes("PIN") && part.length > 2) {
// // //                   if (i + 1 < parts.length) {
// // //                     const nextPart = parts[i + 1].trim();
// // //                     if (nextPart.includes("Andhra Pradesh") || 
// // //                         nextPart.includes("Telangana") ||
// // //                         nextPart.includes("Karnataka") ||
// // //                         nextPart.includes("Tamil Nadu") ||
// // //                         nextPart.match(/^[A-Za-z\s]+$/)) {
// // //                       return `${part}, ${nextPart}`;
// // //                     }
// // //                   }
// // //                   return part;
// // //                 }
// // //               }
// // //             }
// // //           }
// // //         }
// // //       }
// // //     } catch (googleErr) {
// // //       console.log("Google Maps failed:", googleErr);
// // //     }
    
// // //     try {
// // //       const weatherResponse = await fetch(
// // //         `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latVal},${lonVal}?unitGroup=metric&key=${apiKey}&contentType=json`
// // //       );
      
// // //       if (weatherResponse.ok) {
// // //         const weatherData = await weatherResponse.json();
// // //         const resolvedAddress = weatherData.resolvedAddress;
        
// // //         if (resolvedAddress && !isCoordsString(resolvedAddress)) {
// // //           console.log("Weather API location:", resolvedAddress);
// // //           return resolvedAddress;
// // //         }
// // //       }
// // //     } catch (weatherErr) {
// // //       console.log("Weather API location failed:", weatherErr);
// // //     }
    
// // //     try {
// // //       const ipResponse = await fetch("https://ipapi.co/json/");
// // //       if (ipResponse.ok) {
// // //         const ipData = await ipResponse.json();
// // //         console.log("IP location data:", ipData);
        
// // //         if (ipData.city && ipData.region) {
// // //           return `${ipData.city}, ${ipData.region}`;
// // //         }
// // //       }
// // //     } catch (ipErr) {
// // //       console.log("IP detection failed:", ipErr);
// // //     }
    
// // //     return "Your Location";
// // //   };

// // //   const fetchWeatherByCoords = async (latitude, longitude) => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await fetch(
// // //         `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=metric&key=${apiKey}&contentType=json`
// // //       );
// // //       if (!response.ok) throw new Error("Bad API Request");

// // //       const data = await response.json();
// // //       console.log("Weather data fetched:", data);
      
// // //       const cityName = await getAccurateCity(latitude, longitude);
// // //       console.log("Final city name determined:", cityName);
      
// // //       setDisplayName(cityName);
// // //       setLocation(cityName);
      
// // //       setWeather(data);
// // //       setError(null);
// // //     } catch (err) {
// // //       console.error("Error fetching weather by coords:", err);
// // //       setError("Failed to fetch weather for your location.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const detectUserCity = () => {
// // //     setLoading(true);
// // //     setError(null);

// // //     if (!navigator.geolocation) {
// // //       setError("Geolocation is not supported by your browser. Please enter your city manually.");
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     navigator.geolocation.getCurrentPosition(
// // //       async (position) => {
// // //         const latitude = position.coords.latitude;
// // //         const longitude = position.coords.longitude;
// // //         const accuracy = position.coords.accuracy;
        
// // //         console.log("Geolocation obtained:", {
// // //           latitude,
// // //           longitude,
// // //           accuracy: accuracy + " meters"
// // //         });
        
// // //         if (accuracy > 5000) {
// // //           console.warn("Poor location accuracy:", accuracy, "meters");
// // //         }
        
// // //         await fetchWeatherByCoords(latitude, longitude);
// // //       },
// // //       async (error) => {
// // //         console.error("Geolocation error:", error);
        
// // //         try {
// // //           const ipResponse = await fetch("https://ipapi.co/json/");
// // //           if (ipResponse.ok) {
// // //             const ipData = await ipResponse.json();
            
// // //             if (ipData.city && ipData.region) {
// // //               const cityName = `${ipData.city}, ${ipData.region}`;
// // //               setDisplayName(cityName);
// // //               setLocation(cityName);
              
// // //               await fetchWeatherByCoords(ipData.latitude, ipData.longitude);
// // //             } else {
// // //               setError("Could not detect your city from IP. Please enter your city manually.");
// // //               setLoading(false);
// // //             }
// // //           } else {
// // //             throw new Error("IP detection failed");
// // //           }
// // //         } catch (ipErr) {
// // //           console.error("IP fallback failed:", ipErr);
// // //           setError("Please enable location access or enter your city manually.");
// // //           setLoading(false);
// // //         }
// // //       },
// // //       {
// // //         enableHighAccuracy: true, 
// // //         timeout: 15000, 
// // //         maximumAge: 0 
// // //       }
// // //     );
// // //   };

// // //   useEffect(() => {
// // //     detectUserCity();
// // //   }, []);

// // //   const { temp, conditions, humidity, windspeed, winddir, precip, uvindex, sunrise, sunset } =
// // //     weather.currentConditions || {};

// // //   const fahrenheit = temp != null ? (temp * 9) / 5 + 32 : null;

// // //   const { days = [] } = weather;
// // //   const today = days[0] || {};

// // //   function getDashboardClass(condition) {
// // //     if (!condition) return "dashboard-clear";
// // //     const c = condition.toLowerCase();
// // //     if (c.includes("rain")) return "dashboard-rain";
// // //     if (c.includes("cloud")) return "dashboard-cloudy";
// // //     if (c.includes("storm") || c.includes("thunder")) return "dashboard-storm";
// // //     if (c.includes("snow")) return "dashboard-snow";
// // //     if (c.includes("fog") || c.includes("mist")) return "dashboard-fog";
// // //     return "dashboard-clear";
// // //   }

// // //   const dashboardClass = getDashboardClass(conditions);
// // //   const themeClass = getWeatherTheme(conditions);



// // // const getVideoSrc = (condition) => {
// // //   if (!condition) return "/videos/default.mp4";
// // //   const c = condition.toLowerCase();
// // //   if (c.includes("clear") || c.includes("sun")) return "/videos/Sunny.mp4";
// // //   if (c.includes("rain")) return "/videos/Rain.mp4";
// // //   if (c.includes("cloud")) return "/videos/Cloudy.mp4";
// // //   if (c.includes("snow")) return "/videos/Snow.mp4";
// // //   if (c.includes("thunder") || c.includes("storm")) return "/videos/Thunder.mp4";
// // //   if (c.includes("fog") || c.includes("mist")) return "/videos/Foggy.mp4";
// // //   return "/videos/Clear.mp4";
// // // };


// // //   const videoSrc = getVideoSrc(conditions);


// // //   return (
// // //     <div className={`Container ${themeClass}`} style={{ position: "relative", overflow: "hidden" }}>
// // //     <video key={videoSrc} autoPlay loop muted playsInline className="weather-video-bg">
// // //         <source src={videoSrc} type="video/mp4" />
// // //     </video>



// // //       <div className="search-bar">
// // //         <input
// // //           type="text"
// // //           value={location}
// // //           placeholder="Enter city name"
// // //           onChange={(e) => setLocation(e.target.value)}
// // //           onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
// // //         />
// // //         <button onClick={fetchWeather}>Search</button>
// // //         <button 
// // //           onClick={() => {
// // //             setLoading(true);
// // //             detectUserCity();
// // //           }}
// // //           style={{ marginLeft: '10px', background: '#4CAF50', color: 'white' }}
// // //           title="Detect my current city"
// // //         >
// // //           📍
// // //         </button>
// // //       </div>

// // //       {error && <div className="error-message">{error}</div>}

// // //       {Loading ? (
// // //         <Loader />
// // //       ) : (
// // //         <>
// // //           {weather.resolvedAddress !== undefined && (
// // //             <div className={`weather-dashboard ${dashboardClass}`}>
// // //               <div className="location-header">
// // //                 <h2 className="city-name">{displayName || "Your Location"}</h2>
// // //                 <p className="weather-summary">{weather.description}</p>
// // //               </div>

// // //               <div className="weather-grid">
// // //                 <div className="weather-box condition">
// // //                   <p>{getWeatherEmoji(weather.currentConditions?.conditions)} Condition</p>
// // //                   <h3>{weather.currentConditions?.conditions || "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box temp-c">
// // //                   <p>🌡 Temp (°C)</p>
// // //                   <h3>{temp != null ? `${temp}°C` : "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box temp-f">
// // //                   <p>🔥 Temp (°F)</p>
// // //                   <h3>{fahrenheit != null ? `${fahrenheit.toFixed(1)}°F` : "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box humidity">
// // //                   <p>💧 Humidity</p>
// // //                   <h3>{humidity != null ? `${humidity}%` : "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box wind-speed">
// // //                   <p>💨 Wind Speed</p>
// // //                   <h3>{windspeed != null ? `${windspeed} km/h` : "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box wind-dir">
// // //                   <p>🧭 Wind Direction</p>
// // //                   <h3>{winddir != null ? `${getWindDirection(winddir)} (${winddir}°)` : "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box rain">
// // //                   <p>🌧 Rain Rate</p>
// // //                   <h3>{precip != null ? `${precip} mm/hr` : "0 mm/hr"}</h3>
// // //                 </div>

// // //                 <div className="weather-box uv">
// // //                   <p>☀ UV Index</p>
// // //                   <h3>{uvindex != null ? uvindex : "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box air">
// // //                   <p>🌫 Air Quality</p>
// // //                   <h3>{weather.currentConditions?.aqi || "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box sunrise">
// // //                   <p>🌅 Sunrise</p>
// // //                   <h3>{sunrise || "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box sunset">
// // //                   <p>🌇 Sunset</p>
// // //                   <h3>{sunset || "N/A"}</h3>
// // //                 </div>
// // //               </div>

// // //               <div className="hourly-section">
// // //                 <h2>Hourly Forecast</h2>

// // //                 <div className="hourly-container">
// // //                   {today.hours &&
// // //                     today.hours.slice(0, 12).map((hour, index) => (
// // //                       <div key={index} className="hour-card">
// // //                         <h4>{hour.datetime}</h4>
// // //                         <p>{hour.conditions}</p>
// // //                         <p>🌡 {hour.temp}°C</p>
// // //                         <p>💧 {hour.precipprob}%</p>
// // //                         <p>💨 {hour.windspeed} km/h</p>
// // //                       </div>
// // //                     ))}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {weather.days && <Predicted days={weather.days} />}
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default Weather;












// // // import React, { useEffect, useState } from "react";
// // // import "../../src/Styles/Weather.css";
// // // import Predicted from "./Predicted";
// // // import Loader from "./Loader";

// // // function Weather() {
// // //   const [location, setLocation] = useState("");
// // //   const [weather, setWeather] = useState({});
// // //   const [lat, Setlat] = useState(null);
// // //   const [long, Setlong] = useState(null);
// // //   const apiKey = import.meta.env.VITE_API_KEY;
// // //   const [Loading, setLoading] = useState(true);

// // //   const fetchWeather = () => {
// // //     if (!location.trim()) {
// // //       alert("Please enter a location!");
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setTimeout(async () => {
// // //       try {
// // //         const response = await fetch(
// // //           `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`
// // //         );

// // //         const data = await response.json();
// // //         setWeather(data);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         console.error("Error fetching weather:", error);
// // //         setLoading(false);
// // //       }
// // //     }, 1000);
// // //   };

// // //   const {
// // //     temp,
// // //     conditions,
// // //     humidity,
// // //     windspeed,
// // //     winddir,
// // //     precip,
// // //     uvindex,
// // //     sunrise,
// // //     sunset,
// // //   } = weather.currentConditions || {};

// // //   const fahrenheit = temp ? (temp * 9) / 5 + 32 : null;

// // //   const getWindDirection = (degree) => {
// // //     const directions = [
// // //       "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
// // //       "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
// // //     ];
// // //     const index = Math.round((degree % 360) / 22.5);
// // //     return directions[index % 16];
// // //   };

// // //   const getWeatherTheme = (condition) => {
// // //     if (!condition) return "default-bg";
// // //     const c = condition.toLowerCase();
// // //     if (c.includes("clear") || c.includes("sunny")) return "sunny-bg";
// // //     if (c.includes("rain")) return "rainy-bg";
// // //     if (c.includes("cloud")) return "cloudy-bg";
// // //     if (c.includes("snow")) return "snowy-bg";
// // //     if (c.includes("thunder") || c.includes("storm")) return "stormy-bg";
// // //     if (c.includes("fog") || c.includes("mist")) return "foggy-bg";
// // //     return "default-bg";
// // //   };

// // //   const { days = [] } = weather;
// // //   const today = days[0] || {};
// // //   const { hours = [] } = today;

// // //   const getUserLocation = () => {
// // //     if (!navigator.geolocation) return;

// // //     navigator.geolocation.getCurrentPosition(
// // //       (position) => {
// // //         Setlat(position.coords.latitude);
// // //         Setlong(position.coords.longitude);
// // //         fetchUserlocation(position.coords.latitude, position.coords.longitude);
// // //       },
// // //       (error) => console.log(error)
// // //     );
// // //   };

// // //   const fetchUserlocation = async (latitude, longitude) => {
// // //     try {
// // //       const res = await fetch(
// // //         `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${apiKey}`
// // //       );
// // //       const data = await res.json();
// // //       setWeather(data);
// // //       setLoading(false);
// // //     } catch (error) {
// // //       console.log(error);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     getUserLocation();
// // //   }, []);

// // //   const getDashboardClass = (condition) => {
// // //     if (!condition) return "dashboard-clear";
// // //     const c = condition.toLowerCase();
// // //     if (c.includes("rain")) return "dashboard-rain";
// // //     if (c.includes("cloud")) return "dashboard-cloudy";
// // //     if (c.includes("storm")) return "dashboard-storm";
// // //     if (c.includes("snow")) return "dashboard-snow";
// // //     if (c.includes("fog")) return "dashboard-fog";
// // //     return "dashboard-clear";
// // //   };

// // //   const getVideoSrc = (condition) => {
// // //     if (!condition) return "/videos/default.mp4";
// // //     const c = condition.toLowerCase();
// // //     if (c.includes("sun")) return "/videos/Sunny.mp4";
// // //     if (c.includes("rain")) return "/videos/Rain.mp4";
// // //     if (c.includes("cloud")) return "/videos/Cloudy.mp4";
// // //     if (c.includes("snow")) return "/videos/Snow.mp4";
// // //     if (c.includes("storm")) return "/videos/Thunder.mp4";
// // //     if (c.includes("fog")) return "/videos/Foggy.mp4";
// // //     return "/videos/Clear.mp4";
// // //   };

// // //   const dashboardClass = getDashboardClass(conditions);
// // //   const themeClass = getWeatherTheme(conditions);
// // //   const videoSrc = getVideoSrc(conditions);

// // //   return (
// // //     <div className={`Container ${themeClass}`}>
// // //       <video autoPlay loop muted className="weather-video-bg">
// // //         <source src={videoSrc} type="video/mp4" />
// // //       </video>

// // //       <div className="search-bar">
// // //         <input
// // //           value={location}
// // //           placeholder="Enter city name"
// // //           onChange={(e) => setLocation(e.target.value)}
// // //           onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
// // //         />
// // //         <button onClick={fetchWeather}>Search</button>
// // //         <button onClick={getUserLocation}>📍 My Location</button>
// // //       </div>

// // //       {Loading ? (
// // //         <Loader />
// // //       ) : (
// // //         <>
// // //           {weather.resolvedAddress && (
// // //             <div className={`weather-dashboard ${dashboardClass}`}>
// // //               <h2>{weather.resolvedAddress}</h2>

// // //               <div className="weather-grid">
// // //                 <div>🌡 {temp}°C</div>
// // //                 <div>🔥 {fahrenheit?.toFixed(1)}°F</div>
// // //                 <div>💧 {humidity}%</div>
// // //                 <div>💨 {windspeed} km/h</div>
// // //                 <div>
// // //                   🧭 {winddir ? `${getWindDirection(winddir)} (${winddir}°)` : "N/A"}
// // //                 </div>
// // //                 <div>🌧 {precip ? `${precip} mm/hr` : "0 mm/hr"}</div>
// // //                 <div>☀ UV {uvindex}</div>
// // //                 <div>🌅 {sunrise}</div>
// // //                 <div>🌇 {sunset}</div>
// // //               </div>

// // //               <div className="hourly-container">
// // //                 {hours.slice(0, 12).map((h, i) => (
// // //                   <div key={i} className="hour-card">
// // //                     <p>{h.datetime}</p>
// // //                     <p>{h.temp}°C</p>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           )}

// // //           {weather.days && <Predicted days={weather.days} />}
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default Weather;









// // // import React, { useEffect, useState } from "react";
// // // import "../../src/Styles/Weather.css";
// // // import Predicted from "./Predicted";
// // // import Loader from "./Loader";

// // // function Weather() {
// // //   const [location, setLocation] = useState("");
// // //   const [displayName, setDisplayName] = useState("");
// // //   const [weather, setWeather] = useState({});
// // //   const [error, setError] = useState(null);
// // //   const apiKey = import.meta.env.VITE_API_KEY;
// // //   const [Loading, setLoading] = useState(false);


// // //   const isCoordsString = (s) => {
// // //     if (!s || typeof s !== "string") return false;
// // //     return /^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/.test(s);
// // //   };


// // //   const getWindDirection = (degree) => {
// // //     if (degree == null) return null;
// // //     const directions = [
// // //       "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
// // //       "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
// // //     ];
// // //     const index = Math.round((degree % 360) / 22.5);
// // //     return directions[index % 16];
// // //   };


// // //   const getWeatherTheme = (condition) => {
// // //     if (!condition) return "default-bg";
// // //     const c = condition.toLowerCase();
// // //     if (c.includes("clear") || c.includes("sunny")) return "sunny-bg";
// // //     if (c.includes("rain")) return "rainy-bg";
// // //     if (c.includes("cloud")) return "cloudy-bg";
// // //     if (c.includes("snow")) return "snowy-bg";
// // //     if (c.includes("thunder") || c.includes("storm")) return "stormy-bg";
// // //     if (c.includes("fog") || c.includes("mist")) return "foggy-bg";
// // //     return "default-bg";
// // //   };


// // //   const getWeatherEmoji = (condition) => {
// // //     if (!condition) return "🌤";
// // //     const lower = condition.toLowerCase();
// // //     if (lower.includes("clear") || lower.includes("sun")) return "☀";
// // //     if (lower.includes("cloud")) return "☁";
// // //     if (lower.includes("rain")) return "🌧";
// // //     if (lower.includes("storm") || lower.includes("thunder")) return "🌩";
// // //     if (lower.includes("snow")) return "❄";
// // //     if (lower.includes("fog") || lower.includes("mist") || lower.includes("haze")) return "🌫";
// // //     if (lower.includes("wind")) return "🌬";
// // //     return "🌤";
// // //   };


// // //   const fetchWeather = () => {
// // //     if (!location.trim()) {
// // //       alert("Please enter a location!");
// // //       return;
// // //     }

// // //     setLoading(true);

// // //     setTimeout(async () => {
// // //       try {
// // //         const response = await fetch(
// // //           `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
// // //             location
// // //           )}?unitGroup=metric&key=${apiKey}&contentType=json`
// // //         );
// // //         if (!response.ok) throw new Error("Bad API Request");
// // //         const data = await response.json();

// // //         if (data?.resolvedAddress && !isCoordsString(data.resolvedAddress)) {
// // //           setDisplayName(data.resolvedAddress);
// // //           setLocation(data.resolvedAddress);
// // //         }

// // //         setWeather(data);
// // //       } catch (err) {
// // //         console.error("Error fetching weather:", err);
// // //         setError("Failed to fetch weather for the entered location.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     }, 1000);
// // //   };


// // //   const getAccurateCity = async (latVal, lonVal) => {
// // //     console.log("Getting city for coordinates:", latVal, lonVal);

// // //     try {
// // //       const locationIQResponse = await fetch(
// // //         https://us1.locationiq.com/v1/reverse.php?key=pk.5e9c7e9e2c4d4c2c4d4c2c4d&lat=${latVal}&lon=${lonVal}&format=json&accept-language=en
// // //       );

// // //       if (locationIQResponse.ok) {
// // //         const locationIQData = await locationIQResponse.json();
// // //         console.log("LocationIQ response:", locationIQData);

// // //         const addr = locationIQData.address || {};

// // //         let cityName = "";

// // //         if (addr.city) {
// // //           cityName = addr.city;
// // //           if (addr.county && !addr.county.includes("District")) {
// // //             cityName = ${addr.city}, ${addr.county};
// // //           } else if (addr.state) {
// // //             cityName = ${addr.city}, ${addr.state};
// // //           }
// // //         }
// // //         else if (addr.town) {
// // //           cityName = addr.town;
// // //           if (addr.state) {
// // //             cityName = ${addr.town}, ${addr.state};
// // //           }
// // //         }
// // //         else if (addr.village) {
// // //           cityName = addr.village;
// // //           if (addr.state) {
// // //             cityName = ${addr.village}, ${addr.state};
// // //           }
// // //         }
// // //         else if (addr.suburb) {
// // //           cityName = addr.suburb;
// // //           if (addr.state) {
// // //             cityName = ${addr.suburb}, ${addr.state};
// // //           }
// // //         }
// // //         else if (addr.county) {
// // //           cityName = addr.county.replace(" District", "");
// // //           if (addr.state) {
// // //             cityName = ${addr.county.replace(" District", "")}, ${addr.state};
// // //           }
// // //         }
// // //         else if (addr.state_district) {
// // //           cityName = addr.state_district;
// // //           if (addr.state) {
// // //             cityName = ${addr.state_district}, ${addr.state};
// // //           }
// // //         }
// // //         else if (addr.state) {
// // //           cityName = addr.state;
// // //         }

// // //         if (cityName) {
// // //           console.log("Found city from LocationIQ:", cityName);
// // //           return cityName;
// // //         }
// // //       }
// // //     } catch (locationIQErr) {
// // //       console.log("LocationIQ failed:", locationIQErr);
// // //     }

// // //     try {
// // //       const googleResponse = await fetch(
// // //         https://maps.googleapis.com/maps/api/geocode/json?latlng=${latVal},${lonVal}&key=AIzaSyC2xQv04AcuLInoVQCLHPPm3WQ1pRXr4Nk
// // //       );

// // //       if (googleResponse.ok) {
// // //         const googleData = await googleResponse.json();
// // //         console.log("Google Maps response:", googleData);

// // //         if (googleData.status === "OK" && googleData.results.length > 0) {
// // //           for (const result of googleData.results) {
// // //             const address = result.formatted_address;

// // //             if (address.includes("India")) {
// // //               const parts = address.split(",");

// // //               for (let i = 0; i < Math.min(3, parts.length); i++) {
// // //                 const part = parts[i].trim();
// // //                 if (!part.match(/^\d+$/) && !part.includes("PIN") && part.length > 2) {
// // //                   if (i + 1 < parts.length) {
// // //                     const nextPart = parts[i + 1].trim();
// // //                     if (nextPart.includes("Andhra Pradesh") ||
// // //                       nextPart.includes("Telangana") ||
// // //                       nextPart.includes("Karnataka") ||
// // //                       nextPart.includes("Tamil Nadu") ||
// // //                       nextPart.match(/^[A-Za-z\s]+$/)) {
// // //                       return ${part}, ${nextPart};
// // //                     }
// // //                   }
// // //                   return part;
// // //                 }
// // //               }
// // //             }
// // //           }
// // //         }
// // //       }
// // //     } catch (googleErr) {
// // //       console.log("Google Maps failed:", googleErr);
// // //     }

// // //     try {
// // //       const weatherResponse = await fetch(
// // //         https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latVal},${lonVal}?unitGroup=metric&key=${apiKey}&contentType=json
// // //       );

// // //       if (weatherResponse.ok) {
// // //         const weatherData = await weatherResponse.json();
// // //         const resolvedAddress = weatherData.resolvedAddress;

// // //         if (resolvedAddress && !isCoordsString(resolvedAddress)) {
// // //           console.log("Weather API location:", resolvedAddress);
// // //           return resolvedAddress;
// // //         }
// // //       }
// // //     } catch (weatherErr) {
// // //       console.log("Weather API location failed:", weatherErr);
// // //     }

// // //     try {
// // //       const ipResponse = await fetch("https://ipapi.co/json/");
// // //       if (ipResponse.ok) {
// // //         const ipData = await ipResponse.json();
// // //         console.log("IP location data:", ipData);

// // //         if (ipData.city && ipData.region) {
// // //           return ${ipData.city}, ${ipData.region};
// // //         }
// // //       }
// // //     } catch (ipErr) {
// // //       console.log("IP detection failed:", ipErr);
// // //     }

// // //     return "Your Location";
// // //   };

// // //   const fetchWeatherByCoords = async (latitude, longitude) => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await fetch(
// // //         https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=metric&key=${apiKey}&contentType=json
// // //       );
// // //       if (!response.ok) throw new Error("Bad API Request");

// // //       const data = await response.json();
// // //       console.log("Weather data fetched:", data);

// // //       const cityName = await getAccurateCity(latitude, longitude);
// // //       console.log("Final city name determined:", cityName);

// // //       setDisplayName(cityName);
// // //       setLocation(cityName);

// // //       setWeather(data);
// // //       setError(null);
// // //     } catch (err) {
// // //       console.error("Error fetching weather by coords:", err);
// // //       setError("Failed to fetch weather for your location.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const detectUserCity = () => {
// // //     setLoading(true);
// // //     setError(null);

// // //     if (!navigator.geolocation) {
// // //       setError("Geolocation is not supported by your browser. Please enter your city manually.");
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     navigator.geolocation.getCurrentPosition(
// // //       async (position) => {
// // //         const latitude = position.coords.latitude;
// // //         const longitude = position.coords.longitude;
// // //         const accuracy = position.coords.accuracy;

// // //         console.log("Geolocation obtained:", {
// // //           latitude,
// // //           longitude,
// // //           accuracy: accuracy + " meters"
// // //         });

// // //         if (accuracy > 5000) {
// // //           console.warn("Poor location accuracy:", accuracy, "meters");
// // //         }

// // //         await fetchWeatherByCoords(latitude, longitude);
// // //       },
// // //       async (error) => {
// // //         console.error("Geolocation error:", error);

// // //         try {
// // //           const ipResponse = await fetch("https://ipapi.co/json/");
// // //           if (ipResponse.ok) {
// // //             const ipData = await ipResponse.json();

// // //             if (ipData.city && ipData.region) {
// // //               const cityName = ${ipData.city}, ${ipData.region};
// // //               setDisplayName(cityName);
// // //               setLocation(cityName);

// // //               await fetchWeatherByCoords(ipData.latitude, ipData.longitude);
// // //             } else {
// // //               setError("Could not detect your city from IP. Please enter your city manually.");
// // //               setLoading(false);
// // //             }
// // //           } else {
// // //             throw new Error("IP detection failed");
// // //           }
// // //         } catch (ipErr) {
// // //           console.error("IP fallback failed:", ipErr);
// // //           setError("Please enable location access or enter your city manually.");
// // //           setLoading(false);
// // //         }
// // //       },
// // //       {
// // //         enableHighAccuracy: true,
// // //         timeout: 15000,
// // //         maximumAge: 0
// // //       }
// // //     );
// // //   };

// // //   useEffect(() => {
// // //     detectUserCity();
// // //   }, []);

// // //   const { temp, conditions, humidity, windspeed, winddir, precip, uvindex, sunrise, sunset } =
// // //     weather.currentConditions || {};

// // //   const fahrenheit = temp != null ? (temp * 9) / 5 + 32 : null;

// // //   const { days = [] } = weather;
// // //   const today = days[0] || {};

// // //   function getDashboardClass(condition) {
// // //     if (!condition) return "dashboard-clear";
// // //     const c = condition.toLowerCase();
// // //     if (c.includes("rain")) return "dashboard-rain";
// // //     if (c.includes("cloud")) return "dashboard-cloudy";
// // //     if (c.includes("storm") || c.includes("thunder")) return "dashboard-storm";
// // //     if (c.includes("snow")) return "dashboard-snow";
// // //     if (c.includes("fog") || c.includes("mist")) return "dashboard-fog";
// // //     return "dashboard-clear";
// // //   }

// // //   const dashboardClass = getDashboardClass(conditions);
// // //   const themeClass = getWeatherTheme(conditions);



// // //   const getGifSrc = (condition) => {
// // //     if (!condition) return "/videos/Clear.mp4";

// // //     const c = condition.toLowerCase();

// // //     if (c.includes("clear") || c.includes("sun"))
// // //       return "/videos/Sunny.mp4";

// // //     if (c.includes("rain"))
// // //       return "/videos/Rain.mp4";

// // //     if (c.includes("cloud"))
// // //       return "/videos/Cloudy.mp4";

// // //     if (c.includes("snow"))
// // //       return "/videos/Snow.mp4";

// // //     if (c.includes("thunder") || c.includes("storm"))
// // //       return "/videos/Thunder.mp4";

// // //     if (c.includes("fog") || c.includes("mist"))
// // //       return "/videos/Foggy.mp4";

// // //     return "/videos/Clear.mp4";
// // //   };

// // //   const gifSrc = getGifSrc(conditions);


// // //   return (
// // //     <div className={Container ${themeClass}} style={{ position: "relative", overflow: "hidden" }}>
// // //       <video
// // //         key={gifSrc}
// // //         autoPlay
// // //         loop
// // //         muted
// // //         playsInline
// // //         src={gifSrc}
// // //         alt="weather background"
// // //         className="weather-video-bg"
// // //       />


// // //       <div className="search-bar">
// // //         <input
// // //           type="text"
// // //           value={location}
// // //           placeholder="Enter city name"
// // //           onChange={(e) => setLocation(e.target.value)}
// // //           onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
// // //         />
// // //         <button onClick={fetchWeather}>Search</button>
// // //         <button
// // //           onClick={() => {
// // //             setLoading(true);
// // //             detectUserCity();
// // //           }}
// // //             style={{
// // //     display: "inline-flex",
// // //     alignItems: "center",
// // //     justifyContent: "center",
// // //     gap: "6px",
// // //     height: "44px",          
// // //     padding: "0 12px",
// // //     lineHeight: "1",
// // //     whiteSpace: "nowrap",
// // //     cursor: "pointer"
// // //   }}
// // //           title="Detect my current city"
// // //         >
// // //             <span style={{ display: "flex", alignItems: "center" }}>📍</span>
// // //   <span style={{ display: "flex", alignItems: "center" }}>My location</span>
// // //         </button>
// // //       </div>

// // //       {error && <div className="error-message">{error}</div>}

// // //       {Loading ? (
// // //         <Loader />
// // //       ) : (
// // //         <>
// // //           {weather.resolvedAddress !== undefined && (
// // //             <div className={weather-dashboard ${dashboardClass}}>
// // //               <div className="location-header">
// // //                 <h2 className="city-name">{displayName || "Your Location"}</h2>
// // //                 <p className="weather-summary">{weather.description}</p>
// // //               </div>

// // //               <div className="weather-grid">
// // //                 <div className="weather-box condition">
// // //                   <p>{getWeatherEmoji(weather.currentConditions?.conditions)} Condition</p>
// // //                   <h3>{weather.currentConditions?.conditions || "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box temp-c">
// // //                   <p>🌡 Temp (°C)</p>
// // //                   <h3>{temp != null ? ${temp}°C : "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box temp-f">
// // //                   <p>🔥 Temp (°F)</p>
// // //                   <h3>{fahrenheit != null ? ${fahrenheit.toFixed(1)}°F : "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box humidity">
// // //                   <p>💧 Humidity</p>
// // //                   <h3>{humidity != null ? ${humidity}% : "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box wind-speed">
// // //                   <p>💨 Wind Speed</p>
// // //                   <h3>{windspeed != null ? ${windspeed} km/h : "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box wind-dir">
// // //                   <p>🧭 Wind Direction</p>
// // //                   <h3>{winddir != null ? ${getWindDirection(winddir)} (${winddir}°) : "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box rain">
// // //                   <p>🌧 Rain Rate</p>
// // //                   <h3>{precip != null ? ${precip} mm/hr : "0 mm/hr"}</h3>
// // //                 </div>

// // //                 <div className="weather-box uv">
// // //                   <p>☀ UV Index</p>
// // //                   <h3>{uvindex != null ? uvindex : "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box air">
// // //                   <p>🌫 Air Quality</p>
// // //                   <h3>{weather.currentConditions?.aqi || "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box sunrise">
// // //                   <p>🌅 Sunrise</p>
// // //                   <h3>{sunrise || "N/A"}</h3>
// // //                 </div>

// // //                 <div className="weather-box sunset">
// // //                   <p>🌇 Sunset</p>
// // //                   <h3>{sunset || "N/A"}</h3>
// // //                 </div>
// // //               </div>

// // //               <div className="hourly-section">
// // //                 <h2>Hourly Forecast</h2>

// // //                 <div className="hourly-container">
// // //                   {today.hours &&
// // //                     today.hours.slice(0, 12).map((hour, index) => (
// // //                       <div key={index} className="hour-card">
// // //                         <h4>{hour.datetime}</h4>
// // //                         <p>{hour.conditions}</p>
// // //                         <p>🌡 {hour.temp}°C</p>
// // //                         <p>💧 {hour.precipprob}%</p>
// // //                         <p>💨 {hour.windspeed} km/h</p>
// // //                       </div>
// // //                     ))}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {weather.days && <Predicted days={weather.days} />}
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default Weather;




















// // import React, { useEffect, useState } from "react";
// // import "../../src/Styles/Weather.css";
// // import Predicted from "./Predicted";
// // import Loader from "./Loader";

// // function Weather() {
// //   const [location, setLocation] = useState("");
// //   const [displayName, setDisplayName] = useState("");
// //   const [weather, setWeather] = useState({});
// //   const [error, setError] = useState(null);
// //   const apiKey = import.meta.env.VITE_API_KEY;
// //   const [Loading, setLoading] = useState(false);

// //   const isCoordsString = (s) =>
// //     /^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/.test(s || "");

// //   const getWindDirection = (degree) => {
// //     if (degree == null) return null;
// //     const dirs = [
// //       "N","NNE","NE","ENE","E","ESE","SE","SSE",
// //       "S","SSW","SW","WSW","W","WNW","NW","NNW"
// //     ];
// //     return dirs[Math.round((degree % 360) / 22.5) % 16];
// //   };

// //   const getWeatherTheme = (condition) => {
// //     if (!condition) return "default-bg";
// //     const c = condition.toLowerCase();
// //     if (c.includes("sun")) return "sunny-bg";
// //     if (c.includes("rain")) return "rainy-bg";
// //     if (c.includes("cloud")) return "cloudy-bg";
// //     if (c.includes("snow")) return "snowy-bg";
// //     if (c.includes("storm")) return "stormy-bg";
// //     if (c.includes("fog")) return "foggy-bg";
// //     return "default-bg";
// //   };

// //   const getWeatherEmoji = (c) => {
// //     if (!c) return "🌤";
// //     c = c.toLowerCase();
// //     if (c.includes("sun")) return "☀";
// //     if (c.includes("cloud")) return "☁";
// //     if (c.includes("rain")) return "🌧";
// //     if (c.includes("storm")) return "🌩";
// //     if (c.includes("snow")) return "❄";
// //     if (c.includes("fog")) return "🌫";
// //     return "🌤";
// //   };

// //   const fetchWeather = async () => {
// //     if (!location.trim()) return alert("Enter a location");
// //     setLoading(true);

// //     try {
// //       const res = await fetch(
// //         `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
// //           location
// //         )}?unitGroup=metric&key=${apiKey}&contentType=json`
// //       );
// //       const data = await res.json();
// //       setWeather(data);
// //       setDisplayName(data.resolvedAddress);
// //       setError(null);
// //     } catch {
// //       setError("Failed to fetch weather");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchWeatherByCoords = async (lat, lon) => {
// //     setLoading(true);
// //     try {
// //       const res = await fetch(
// //         `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${apiKey}&contentType=json`
// //       );
// //       const data = await res.json();
// //       setWeather(data);
// //       setDisplayName(data.resolvedAddress);
// //     } catch {
// //       setError("Failed to detect location");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const detectUserCity = () => {
// //     if (!navigator.geolocation) return;
// //     navigator.geolocation.getCurrentPosition(
// //       (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
// //       () => setError("Location access denied"),
// //       { enableHighAccuracy: true }
// //     );
// //   };

// //   useEffect(() => {
// //     detectUserCity();
// //   }, []);

// //   const { temp, conditions, humidity, windspeed, winddir, precip, uvindex, sunrise, sunset } =
// //     weather.currentConditions || {};

// //   const fahrenheit = temp != null ? (temp * 9) / 5 + 32 : null;
// //   const today = weather.days?.[0] || {};
// //   const dashboardClass = conditions?.includes("rain") ? "dashboard-rain" : "dashboard-clear";
// //   const themeClass = getWeatherTheme(conditions);

// //   const getGifSrc = (c) => {
// //     if (!c) return "/videos/Clear.mp4";
// //     c = c.toLowerCase();
// //     if (c.includes("sun")) return "/videos/Sunny.mp4";
// //     if (c.includes("rain")) return "/videos/Rain.mp4";
// //     if (c.includes("cloud")) return "/videos/Cloudy.mp4";
// //     if (c.includes("snow")) return "/videos/Snow.mp4";
// //     if (c.includes("storm")) return "/videos/Thunder.mp4";
// //     if (c.includes("fog")) return "/videos/Foggy.mp4";
// //     return "/videos/Clear.mp4";
// //   };

// //   return (
// //     <div className={`Container ${themeClass}`}>
// //       <video
// //         autoPlay
// //         loop
// //         muted
// //         className="weather-video-bg"
// //         src={getGifSrc(conditions)}
// //       />

// //       <div className="search-bar">
// //         <input
// //           value={location}
// //           onChange={(e) => setLocation(e.target.value)}
// //           placeholder="Enter city"
// //           onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
// //         />
// //         <button onClick={fetchWeather}>Search</button>
// //         <button onClick={detectUserCity}>📍 My Location</button>
// //       </div>

// //       {error && <div className="error-message">{error}</div>}
// //       {Loading ? <Loader /> : (
// //         <>
// //           {weather.resolvedAddress && (
// //             <div className={`weather-dashboard ${dashboardClass}`}>
// //               <h2>{displayName}</h2>

// //               <div className="weather-grid">
// //                 <div>{getWeatherEmoji(conditions)} {conditions}</div>
// //                 <div>🌡 {temp != null ? `${temp}°C` : "N/A"}</div>
// //                 <div>🔥 {fahrenheit != null ? `${fahrenheit.toFixed(1)}°F` : "N/A"}</div>
// //                 <div>💧 {humidity != null ? `${humidity}%` : "N/A"}</div>
// //                 <div>💨 {windspeed != null ? `${windspeed} km/h` : "N/A"}</div>
// //                 <div>🧭 {winddir != null ? `${getWindDirection(winddir)} (${winddir}°)` : "N/A"}</div>
// //                 <div>🌧 {precip != null ? `${precip} mm/hr` : "0 mm/hr"}</div>
// //                 <div>☀ {uvindex ?? "N/A"}</div>
// //                 <div>🌅 {sunrise ?? "N/A"}</div>
// //                 <div>🌇 {sunset ?? "N/A"}</div>
// //               </div>

// //               <div className="hourly-container">
// //                 {today.hours?.slice(0, 12).map((h, i) => (
// //                   <div key={i} className="hour-card">
// //                     <p>{h.datetime}</p>
// //                     <p>{h.temp}°C</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //           {weather.days && <Predicted days={weather.days} />}
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// // export default Weather;







































// import React, { useEffect, useState } from "react";
// import "../../src/Styles/Weather.css";
// import Predicted from "./Predicted";
// import Loader from "./Loader";

// function Weather() {
//   const [location, setLocation] = useState("");
//   const [displayName, setDisplayName] = useState("");
//   const [weather, setWeather] = useState({});
//   const [error, setError] = useState(null);
//   const apiKey = import.meta.env.VITE_API_KEY;
//   const [Loading, setLoading] = useState(false);

//   const isCoordsString = (s) =>
//     /^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/.test(s || "");

//   const getWindDirection = (degree) => {
//     if (degree == null) return null;
//     const directions = [
//       "N","NNE","NE","ENE","E","ESE","SE","SSE",
//       "S","SSW","SW","WSW","W","WNW","NW","NNW",
//     ];
//     return directions[Math.round((degree % 360) / 22.5) % 16];
//   };

//   const getWeatherTheme = (condition) => {
//     if (!condition) return "default-bg";
//     const c = condition.toLowerCase();
//     if (c.includes("sun")) return "sunny-bg";
//     if (c.includes("rain")) return "rainy-bg";
//     if (c.includes("cloud")) return "cloudy-bg";
//     if (c.includes("snow")) return "snowy-bg";
//     if (c.includes("storm")) return "stormy-bg";
//     if (c.includes("fog")) return "foggy-bg";
//     return "default-bg";
//   };

//   const getWeatherEmoji = (condition) => {
//     if (!condition) return "🌤";
//     const c = condition.toLowerCase();
//     if (c.includes("sun")) return "☀";
//     if (c.includes("cloud")) return "☁";
//     if (c.includes("rain")) return "🌧";
//     if (c.includes("storm")) return "🌩";
//     if (c.includes("snow")) return "❄";
//     if (c.includes("fog")) return "🌫";
//     return "🌤";
//   };

//   const fetchWeather = async () => {
//     if (!location.trim()) {
//       alert("Please enter a location!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
//           location
//         )}?unitGroup=metric&key=${apiKey}&contentType=json`
//       );

//       const data = await response.json();
//       setWeather(data);
//       setDisplayName(data.resolvedAddress);
//       setError(null);
//     } catch {
//       setError("Failed to fetch weather.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchWeatherByCoords = async (lat, lon) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${apiKey}&contentType=json`
//       );

//       const data = await response.json();
//       setWeather(data);
//       setDisplayName(data.resolvedAddress);
//     } catch {
//       setError("Failed to detect location.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const detectUserCity = () => {
//     if (!navigator.geolocation) return;
//     navigator.geolocation.getCurrentPosition(
//       (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
//       () => setError("Location access denied"),
//       { enableHighAccuracy: true }
//     );
//   };

//   useEffect(() => {
//     detectUserCity();
//   }, []);

//   const {
//     temp,
//     conditions,
//     humidity,
//     windspeed,
//     winddir,
//     precip,
//     uvindex,
//     sunrise,
//     sunset,
//   } = weather.currentConditions || {};

//   const fahrenheit = temp != null ? (temp * 9) / 5 + 32 : null;
//   const today = weather.days?.[0] || {};

//   const getDashboardClass = (condition) => {
//     if (!condition) return "dashboard-clear";
//     const c = condition.toLowerCase();
//     if (c.includes("rain")) return "dashboard-rain";
//     if (c.includes("cloud")) return "dashboard-cloudy";
//     if (c.includes("storm")) return "dashboard-storm";
//     if (c.includes("snow")) return "dashboard-snow";
//     if (c.includes("fog")) return "dashboard-fog";
//     return "dashboard-clear";
//   };

//   const dashboardClass = getDashboardClass(conditions);
//   const themeClass = getWeatherTheme(conditions);

//   const getGifSrc = (condition) => {
//     if (!condition) return "/videos/Clear.mp4";
//     const c = condition.toLowerCase();
//     if (c.includes("sun")) return "/videos/Sunny.mp4";
//     if (c.includes("rain")) return "/videos/Rain.mp4";
//     if (c.includes("cloud")) return "/videos/Cloudy.mp4";
//     if (c.includes("snow")) return "/videos/Snow.mp4";
//     if (c.includes("storm")) return "/videos/Thunder.mp4";
//     if (c.includes("fog")) return "/videos/Foggy.mp4";
//     return "/videos/Clear.mp4";
//   };

//   return (
//     <div className={`Container ${themeClass}`} style={{ position: "relative", overflow: "hidden" }}>
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         src={getGifSrc(conditions)}
//         className="weather-video-bg"
//       />

//       <div className="search-bar">
//         <input
//           type="text"
//           value={location}
//           placeholder="Enter city name"
//           onChange={(e) => setLocation(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
//         />
//         <button onClick={fetchWeather}>Search</button>
//         <button onClick={detectUserCity}>📍 My location</button>
//       </div>

//       {error && <div className="error-message">{error}</div>}

//       {Loading ? (
//         <Loader />
//       ) : (
//         <>
//           {weather.resolvedAddress && (
//             <div className={`weather-dashboard ${dashboardClass}`}>
//               <h2 className="city-name">{displayName || "Your Location"}</h2>

//               <div className="weather-grid">
//                 <div>{getWeatherEmoji(conditions)} {conditions}</div>
//                 <div>🌡 {temp != null ? `${temp}°C` : "N/A"}</div>
//                 <div>🔥 {fahrenheit != null ? `${fahrenheit.toFixed(1)}°F` : "N/A"}</div>
//                 <div>💧 {humidity != null ? `${humidity}%` : "N/A"}</div>
//                 <div>💨 {windspeed != null ? `${windspeed} km/h` : "N/A"}</div>
//                 <div>🧭 {winddir != null ? `${getWindDirection(winddir)} (${winddir}°)` : "N/A"}</div>
//                 <div>🌧 {precip != null ? `${precip} mm/hr` : "0 mm/hr"}</div>
//                 <div>☀ {uvindex ?? "N/A"}</div>
//                 <div>🌅 {sunrise ?? "N/A"}</div>
//                 <div>🌇 {sunset ?? "N/A"}</div>
//               </div>

//               <div className="hourly-container">
//                 {today.hours?.slice(0, 12).map((h, i) => (
//                   <div key={i} className="hour-card">
//                     <p>{h.datetime}</p>
//                     <p>{h.temp}°C</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {weather.days && <Predicted days={weather.days} />}
//         </>
//       )}
//     </div>
//   );
// }

// export default Weather;


























































































































import React, { useEffect, useState } from "react";
import "../../src/Styles/Weather.css";
import Predicted from "./Predicted";
import Loader from "./Loader";

function Weather() {
  const [location, setLocation] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const [Loading, setLoading] = useState(false);


  const isCoordsString = (s) => {
    if (!s || typeof s !== "string") return false;
    return /^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/.test(s);
  };


  const getWindDirection = (degree) => {
    if (degree == null) return null;
    const directions = [
      "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
      "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
    ];
    const index = Math.round((degree % 360) / 22.5);
    return directions[index % 16];
  };


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


  const getWeatherEmoji = (condition) => {
    if (!condition) return "🌤";
    const lower = condition.toLowerCase();
    if (lower.includes("clear") || lower.includes("sun")) return "☀";
    if (lower.includes("cloud")) return "☁";
    if (lower.includes("rain")) return "🌧";
    if (lower.includes("storm") || lower.includes("thunder")) return "🌩";
    if (lower.includes("snow")) return "❄";
    if (lower.includes("fog") || lower.includes("mist") || lower.includes("haze")) return "🌫";
    if (lower.includes("wind")) return "🌬";
    return "🌤";
  };


  const fetchWeather = () => {
    if (!location.trim()) {
      alert("Please enter a location!");
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
            location
          )}?unitGroup=metric&key=${apiKey}&contentType=json`
        );
        if (!response.ok) throw new Error("Bad API Request");
        const data = await response.json();

        if (data?.resolvedAddress && !isCoordsString(data.resolvedAddress)) {
          setDisplayName(data.resolvedAddress);
          setLocation(data.resolvedAddress);
        }

        setWeather(data);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setError("Failed to fetch weather for the entered location.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };


  const getAccurateCity = async (latVal, lonVal) => {
    console.log("Getting city for coordinates:", latVal, lonVal);

    try {
      const locationIQResponse = await fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=pk.5e9c7e9e2c4d4c2c4d4c2c4d&lat=${latVal}&lon=${lonVal}&format=json&accept-language=en`
      );

      if (locationIQResponse.ok) {
        const locationIQData = await locationIQResponse.json();
        console.log("LocationIQ response:", locationIQData);

        const addr = locationIQData.address || {};

        let cityName = "";

        if (addr.city) {
          cityName = addr.city;
          if (addr.county && !addr.county.includes("District")) {
            cityName = `${addr.city}, ${addr.county}`;
          } else if (addr.state) {
            cityName = `${addr.city}, ${addr.state}`;
          }
        }
        else if (addr.town) {
          cityName = addr.town;
          if (addr.state) {
            cityName = `${addr.town}, ${addr.state}`;
          }
        }
        else if (addr.village) {
          cityName = addr.village;
          if (addr.state) {
            cityName = `${addr.village}, ${addr.state}`;
          }
        }
        else if (addr.suburb) {
          cityName = addr.suburb;
          if (addr.state) {
            cityName = `${addr.suburb}, ${addr.state}`;
          }
        }
        else if (addr.county) {
          cityName = addr.county.replace(" District", "");
          if (addr.state) {
            cityName = `${addr.county.replace(" District", "")}, ${addr.state}`;
          }
        }
        else if (addr.state_district) {
          cityName = addr.state_district;
          if (addr.state) {
            cityName = `${addr.state_district}, ${addr.state}`;
          }
        }
        else if (addr.state) {
          cityName = addr.state;
        }

        if (cityName) {
          console.log("Found city from LocationIQ:", cityName);
          return cityName;
        }
      }
    } catch (locationIQErr) {
      console.log("LocationIQ failed:", locationIQErr);
    }

    try {
      const googleResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latVal},${lonVal}&key=AIzaSyC2xQv04AcuLInoVQCLHPPm3WQ1pRXr4Nk`
      );

      if (googleResponse.ok) {
        const googleData = await googleResponse.json();
        console.log("Google Maps response:", googleData);

        if (googleData.status === "OK" && googleData.results.length > 0) {
          for (const result of googleData.results) {
            const address = result.formatted_address;

            if (address.includes("India")) {
              const parts = address.split(",");

              for (let i = 0; i < Math.min(3, parts.length); i++) {
                const part = parts[i].trim();
                if (!part.match(/^\d+$/) && !part.includes("PIN") && part.length > 2) {
                  if (i + 1 < parts.length) {
                    const nextPart = parts[i + 1].trim();
                    if (nextPart.includes("Andhra Pradesh") ||
                      nextPart.includes("Telangana") ||
                      nextPart.includes("Karnataka") ||
                      nextPart.includes("Tamil Nadu") ||
                      nextPart.match(/^[A-Za-z\s]+$/)) {
                      return `${part}, ${nextPart}`;
                    }
                  }
                  return part;
                }
              }
            }
          }
        }
      }
    } catch (googleErr) {
      console.log("Google Maps failed:", googleErr);
    }

    try {
      const weatherResponse = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latVal},${lonVal}?unitGroup=metric&key=${apiKey}&contentType=json`
      );

      if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json();
        const resolvedAddress = weatherData.resolvedAddress;

        if (resolvedAddress && !isCoordsString(resolvedAddress)) {
          console.log("Weather API location:", resolvedAddress);
          return resolvedAddress;
        }
      }
    } catch (weatherErr) {
      console.log("Weather API location failed:", weatherErr);
    }

    try {
      const ipResponse = await fetch("https://ipapi.co/json/");
      if (ipResponse.ok) {
        const ipData = await ipResponse.json();
        console.log("IP location data:", ipData);

        if (ipData.city && ipData.region) {
          return `${ipData.city}, ${ipData.region}`;
        }
      }
    } catch (ipErr) {
      console.log("IP detection failed:", ipErr);
    }

    return "Your Location";
  };

  const fetchWeatherByCoords = async (latitude, longitude) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=metric&key=${apiKey}&contentType=json`
      );
      if (!response.ok) throw new Error("Bad API Request");

      const data = await response.json();
      console.log("Weather data fetched:", data);

      const cityName = await getAccurateCity(latitude, longitude);
      console.log("Final city name determined:", cityName);

      setDisplayName(cityName);
      setLocation(cityName);

      setWeather(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching weather by coords:", err);
      setError("Failed to fetch weather for your location.");
    } finally {
      setLoading(false);
    }
  };

  const detectUserCity = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser. Please enter your city manually.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        console.log("Geolocation obtained:", {
          latitude,
          longitude,
          accuracy: accuracy + " meters"
        });

        if (accuracy > 5000) {
          console.warn("Poor location accuracy:", accuracy, "meters");
        }

        await fetchWeatherByCoords(latitude, longitude);
      },
      async (error) => {
        console.error("Geolocation error:", error);

        try {
          const ipResponse = await fetch("https://ipapi.co/json/");
          if (ipResponse.ok) {
            const ipData = await ipResponse.json();

            if (ipData.city && ipData.region) {
              const cityName = `${ipData.city}, ${ipData.region}`;
              setDisplayName(cityName);
              setLocation(cityName);

              await fetchWeatherByCoords(ipData.latitude, ipData.longitude);
            } else {
              setError("Could not detect your city from IP. Please enter your city manually.");
              setLoading(false);
            }
          } else {
            throw new Error("IP detection failed");
          }
        } catch (ipErr) {
          console.error("IP fallback failed:", ipErr);
          setError("Please enable location access or enter your city manually.");
          setLoading(false);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
    detectUserCity();
  }, []);

  const { temp, conditions, humidity, windspeed, winddir, precip, uvindex, sunrise, sunset } =
    weather.currentConditions || {};

  const fahrenheit = temp != null ? (temp * 9) / 5 + 32 : null;

  const { days = [] } = weather;
  const today = days[0] || {};

  function getDashboardClass(condition) {
    if (!condition) return "dashboard-clear";
    const c = condition.toLowerCase();
    if (c.includes("rain")) return "dashboard-rain";
    if (c.includes("cloud")) return "dashboard-cloudy";
    if (c.includes("storm") || c.includes("thunder")) return "dashboard-storm";
    if (c.includes("snow")) return "dashboard-snow";
    if (c.includes("fog") || c.includes("mist")) return "dashboard-fog";
    return "dashboard-clear";
  }

  const dashboardClass = getDashboardClass(conditions);
  const themeClass = getWeatherTheme(conditions);



  const getGifSrc = (condition) => {
    if (!condition) return "/videos/Clear.mp4";

    const c = condition.toLowerCase();

    if (c.includes("clear") || c.includes("sun"))
      return "/videos/Sunny.mp4";

    if (c.includes("rain"))
      return "/videos/Rain.mp4";

    if (c.includes("cloud"))
      return "/videos/Cloudy.mp4";

    if (c.includes("snow"))
      return "/videos/Snow.mp4";

    if (c.includes("thunder") || c.includes("storm"))
      return "/videos/Thunder.mp4";

    if (c.includes("fog") || c.includes("mist"))
      return "/videos/Foggy.mp4";

    return "/videos/Clear.mp4";
  };

  const gifSrc = getGifSrc(conditions);


  return (
    <div className={`Container ${themeClass}`} style={{ position: "relative", overflow: "hidden" }}>
      <video
        key={gifSrc}
        autoPlay
        loop
        muted
        playsInline
        src={gifSrc}
        alt="weather background"
        className="weather-video-bg"
      />


      <div className="search-bar">
        <input
          type="text"
          value={location}
          placeholder="Enter city name"
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button onClick={fetchWeather}>Search</button>
        <button
          onClick={() => {
            setLoading(true);
            detectUserCity();
          }}
            style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    height: "44px",          
    padding: "0 12px",
    lineHeight: "1",
    whiteSpace: "nowrap",
    cursor: "pointer"
  }}
          title="Detect my current city"
        >
            <span style={{ display: "flex", alignItems: "center" }}>📍</span>
  <span style={{ display: "flex", alignItems: "center" }}>My location</span>
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {Loading ? (
        <Loader />
      ) : (
        <>
          {weather.resolvedAddress !== undefined && (
            <div className={`weather-dashboard ${dashboardClass}`}>
              <div className="location-header">
                <h2 className="city-name">{displayName || "Your Location"}</h2>
                <p className="weather-summary">{weather.description}</p>
              </div>

              <div className="weather-grid">
                <div className="weather-box condition">
                  <p>{getWeatherEmoji(weather.currentConditions?.conditions)} Condition</p>
                  <h3>{weather.currentConditions?.conditions || "N/A"}</h3>
                </div>

                <div className="weather-box temp-c">
                  <p>🌡 Temp (°C)</p>
                  <h3>{temp != null ? `${temp}°C` : "N/A"}</h3>
                </div>

                <div className="weather-box temp-f">
                  <p>🔥 Temp (°F)</p>
                  <h3>{fahrenheit != null ? `${fahrenheit.toFixed(1)}°F` : "N/A"}</h3>
                </div>

                <div className="weather-box humidity">
                  <p>💧 Humidity</p>
                  <h3>{humidity != null ? `${humidity}%` : "N/A"}</h3>
                </div>

                <div className="weather-box wind-speed">
                  <p>💨 Wind Speed</p>
                  <h3>{windspeed != null ? `${windspeed} km/h` : "N/A"}</h3>
                </div>

                <div className="weather-box wind-dir">
                  <p>🧭 Wind Direction</p>
                  <h3>{winddir != null ? `${getWindDirection(winddir)} (${winddir}°)` : "N/A"}</h3>
                </div>

                <div className="weather-box rain">
                  <p>🌧 Rain Rate</p>
                  <h3>{precip != null ? `${precip} mm/hr` : "0 mm/hr"}</h3>
                </div>

                <div className="weather-box uv">
                  <p>☀ UV Index</p>
                  <h3>{uvindex != null ? uvindex : "N/A"}</h3>
                </div>

                <div className="weather-box air">
                  <p>🌫 Air Quality</p>
                  <h3>{weather.currentConditions?.aqi || "N/A"}</h3>
                </div>

                <div className="weather-box sunrise">
                  <p>🌅 Sunrise</p>
                  <h3>{sunrise || "N/A"}</h3>
                </div>

                <div className="weather-box sunset">
                  <p>🌇 Sunset</p>
                  <h3>{sunset || "N/A"}</h3>
                </div>
              </div>

              <div className="hourly-section">
                <h2>Hourly Forecast</h2>

                <div className="hourly-container">
                  {today.hours &&
                    today.hours.slice(0, 12).map((hour, index) => (
                      <div key={index} className="hour-card">
                        <h4>{hour.datetime}</h4>
                        <p>{hour.conditions}</p>
                        <p>🌡 {hour.temp}°C</p>
                        <p>💧 {hour.precipprob}%</p>
                        <p>💨 {hour.windspeed} km/h</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {weather.days && <Predicted days={weather.days} />}
        </>
      )}
    </div>
  );
}

export default Weather;
