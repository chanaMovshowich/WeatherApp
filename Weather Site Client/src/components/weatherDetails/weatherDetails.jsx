import React from 'react';
import './WeatherDetails.css';

/**
 * WeatherDetails component displays detailed weather information for a given location.
 * It shows the location, current temperature, weather conditions, precipitation, humidity, wind speed,
 * and an hourly breakdown of temperatures if available.
 * 
 * Accessibility features are included, with ARIA roles and labels to support screen readers.
 */
const WeatherDetails = ({ weatherDetails }) => {
    const modifiedDateTimeString = weatherDetails.localtime.replace(' ', ' at ');

    return (
        <div className='container' role="region" aria-labelledby="weather-details-title">
            <div className="weather-card">
                {/* Location information */}
                <div className="location">
                    <h2 id='location'>{weatherDetails.region}</h2>
                    <p>{weatherDetails.country}</p>
                    <p>{modifiedDateTimeString}</p>
                </div>

                {/* Temperature and condition */}
                <div className="temperature" aria-labelledby="temperature-label">
                    <h1 id="temperature-label">{weatherDetails.temp_c}°</h1>
                    <p>{weatherDetails.condition}</p>
                </div>

                {/* Additional weather details */}
                <div className="details" role="group" aria-labelledby="details-label">
                    <div aria-labelledby="precipitation-label">
                        <p id="precipitation-label">Precipitation</p>
                        <p><strong>{weatherDetails.precip_mm} mm</strong></p>
                    </div>
                    <div>
                        <p id="humidity-label">Humidity</p>
                        <p><strong>{weatherDetails.humidity}%</strong></p>
                    </div>
                    <div>
                        <p id="wind-label">Wind</p>
                        <p><strong>{weatherDetails.wind_kph} km/h</strong></p>
                    </div>
                </div>

                {/* Hourly temperatures */}
                <div className="hourly-temperatures">
                    {weatherDetails.hourlyTemperatures?.map((temp, index) => (
                        <div key={index} className="hour">
                            <p>{temp.time}</p>
                            <p>{temp.temp}°</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherDetails;
