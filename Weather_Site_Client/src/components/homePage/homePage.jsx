import { useState } from "react";
import "./homePage.css";
import logoImage from "../../assets/logo.svg";
import { getWeatherDetails } from "../../api/weatherApi";
import WeatherDetails from "../weatherDetails/weatherDetails";

/**
 * HomePage component allows users to input a city name and fetch its weather details.
 * It displays weather information based on the user's input, with basic error handling
 * and accessibility features.
 */
const HomePage = () => {
    const [cityName, setCityName] = useState("");
    const [weatherDetails, setWeatherDetails] = useState(null);
    const [error, setError] = useState("");
    const modifiedDateTimeString = weatherDetails.localtime.replaceAll('-', '/').replace(' ', ' at ');

    // Handles changes in the city name input field
    const handleChange = (event) => {
        setCityName(event.target.value);
        setError("");
    };

    // Handles the Enter key press to trigger weather fetching
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchWeather();
        }
    };

    // Fetches the weather details from the API based on the city name input
    const fetchWeather = async () => {
        // Validate city name (must contain only letters and spaces)

        if (!/^[A-Za-z\s-]{1,50}$/.test(cityName)) {
            setError("City name must contain only letters and spaces.");
            setWeatherDetails(null);
            return;
        }

        try {
            const response = await getWeatherDetails(cityName);
            setWeatherDetails(response.data);
        } catch (error) {
            setWeatherDetails(null); // Reset weather details on error
            console.error("Error fetching weather details:", error);
            setError("An error occurred. Please check the city name."); // Set user-friendly error message
        }
    };

    return (
        <div className="main">
            <div className="check-city">
                <img className="logo-img" src={logoImage} alt="company-logo" aria-label="Company Logo" />
                <p className="presentation-text">
                    Use our weather app to see the weather around the world
                </p>

                <div className="text-box-container">
                    <p className="visually-hidden" id="input-label">City name</p>
                    <div id="inputs">
                        <div>
                            <input
                                type="text"
                                id="cityName"
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                value={cityName}
                                aria-describedby="input-label"
                                aria-label="City name input field"
                                aria-invalid={!!error}
                            />
                            <input
                                type="button"
                                value="Check"
                                onClick={fetchWeather}
                                aria-label="Check weather"
                            />
                        </div>
                    </div>
                    {/* Display error message if any */}
                    {error && <p className="error" role="alert">{error}</p>}
                </div>

                {/* Display weather details if available */}
                {weatherDetails && Object.keys(weatherDetails).length > 0 && (
                    <div className="botom" aria-live="polite">
                        <div>
                            <p>Latitude: {weatherDetails.lat}</p>
                            <p>Longitude: {weatherDetails.lon}</p>
                        </div>
                        Accurate to {modifiedDateTimeString}
                    </div>
                )}
            </div>

            {/* Renders WeatherDetails component if weather data is available */}
            <div id="weather-details">
                {weatherDetails && Object.keys(weatherDetails).length > 0 && (
                    <WeatherDetails weatherDetails={weatherDetails} />
                )}
            </div>
        </div>
    );
};

export default HomePage;
