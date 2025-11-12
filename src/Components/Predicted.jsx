import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../src/Styles/Predicted.css";

function Predicted({ days }) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!days || days.length < 4) return null; // Ensure at least 3 days exist

  const today = days[0];
  const handleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div className="predicted-weather container my-4">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* ---------- FRONT SIDE ---------- */}
        <div className="card shadow-lg rounded-4 p-4 text-center bg-light front-side">
          <h2 className="mb-2">
            {new Date(today.datetime).toLocaleDateString(undefined, {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </h2>
          <p className="fs-5">{today.conditions}</p>
          <p className="fs-4">🌡️ {today.temp}°C</p>
          <p>
            ↑ Max: {today.tempmax}°C | ↓ Min: {today.tempmin}°C
          </p>
          <button
            className="btn btn-primary mt-3"
            onClick={handleFlip}
          >
            View 3-Day Forecast ➡️
          </button>
        </div>

        {/* ---------- BACK SIDE ---------- */}
        <div className="card shadow-lg rounded-4 p-4 bg-white back-side">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="mb-0">Next 3 Days Forecast</h3>
            <button className="btn btn-outline-secondary" onClick={handleFlip}>
              ⬅️ Back
            </button>
          </div>

          <div className="accordion" id="forecastAccordion">
            {days.slice(1, 4).map((day, index) => {
              const date = new Date(day.datetime).toLocaleDateString(undefined, {
                weekday: "long",
                month: "short",
                day: "numeric",
              });

              return (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded={index === 0 ? "true" : "false"}
                      aria-controls={`collapse${index}`}
                    >
                      <div className="w-100 d-flex justify-content-between align-items-center">
                        <span>
                          <strong>{date}</strong> — {day.conditions}
                        </span>
                        <span>
                          🌡️ Max: {day.tempmax}°C | Min: {day.tempmin}°C
                        </span>
                      </div>
                    </button>
                  </h2>

                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#forecastAccordion"
                  >
                    <div className="accordion-body">
                      <div className="row">
                        <div className="col-md-6">
                          <p>🌤️ Condition: {day.conditions}</p>
                          <p>🌡️ Avg Temp: {day.temp}°C</p>
                          <p>
                            ↑ Max: {day.tempmax}°C | ↓ Min: {day.tempmin}°C
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>💧 Precipitation: {day.precipprob}%</p>
                          <p>💨 Wind Speed: {day.windspeed} km/h</p>
                          <p>☀️ UV Index: {day.uvindex}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default Predicted;
