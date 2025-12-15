import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../src/Styles/Predicted.css";

function Predicted({ days }) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!days || days.length < 4) return null;

  const today = days[0];

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="predicted-weather container my-4">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">

        {/* ---------- FRONT SIDE ---------- */}
     <div
  className="card shadow-lg rounded-4 p-4 text-center front-side"
  onClick={handleFlip}
>
  <div className="front-top">
    <h2 className="front-date">
      {new Date(today.datetime).toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
      })}
    </h2>

    <p className="front-condition">{today.conditions}</p>
  </div>

  <div className="front-temp">
    <span>🌡️</span>
    <h1>{today.temp}°C</h1>
  </div>

  <div className="front-range">
    <div className="range-box">
      <span>Max</span>
      <strong>{today.tempmax}°C</strong>
    </div>
    <div className="range-divider"></div>
    <div className="range-box">
      <span>Min</span>
      <strong>{today.tempmin}°C</strong>
    </div>
  </div>

  <div className="front-hint">
    Click to view 
  </div>
</div>


        {/* ---------- BACK SIDE ---------- */}
        <div
           className="card shadow-lg rounded-4 p-4 back-side"
            onClick={handleFlip}
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="mb-0">Next 5 Days Forecast</h3>
            <small className="text-muted">Click to go back</small>
          </div>

          <div className="accordion" id="forecastAccordion">
            {days.slice(1, 6).map((day, index) => {
              const date = new Date(day.datetime).toLocaleDateString(
                undefined,
                {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                }
              );

              return (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    {/* Stop flip when clicking accordion */}
                    <button
                      className={`accordion-button ${
                        index !== 0 ? "collapsed" : ""
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded={index === 0 ? "true" : "false"}
                      aria-controls={`collapse${index}`}
                      onClick={(e) => e.stopPropagation()}
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
                    className={`accordion-collapse collapse ${
                      index === 0 ? "show" : ""
                    }`}
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#forecastAccordion"
                  >
                    <div
                      className="accordion-body"
                      onClick={(e) => e.stopPropagation()}
                    >
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
