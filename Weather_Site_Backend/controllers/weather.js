import axios from "axios";


//Retrieves the weather forecast for a specific city.

export const getTheWeatherForecast = async (req, res, next) => {
    const baseUrl = "http://api.weatherapi.com/v1";
    valodation(req);  // Validate request parameters
    let { cityName } = req.query;

    try {
        // Fetch weather data from the API
        let weather = await axios.get(`${baseUrl}/forecast.json?key=${req.apiKey}&q=${cityName}`);

        // Check if the weather data is valid
        if (!weather?.data?.location || !weather?.data?.current) {
            const error = new Error("Failed to retrieve weather data");
            error.status = 500;
            return next(error);
        }

        let weatherData = weather.data;
        let now = new Date(weatherData.location.localtime);
        let yesterday, tomorrow;
        let currentHour = now.getHours();

        // Fetch tomorrow's data if it's currently 23:00
        if (currentHour === 23) {
            now.setDate(now.getDate() + 1);
            let newDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            tomorrow = await axios.get(`${baseUrl}/forecast.json?key=${req.apiKey}&q=${cityName}&dt=${formatDate(newDate)}`);
            tomorrow = tomorrow.data;
        }
        // Fetch yesterday's data if it's currently before 03:00
        else if (currentHour < 3) {
            now.setDate(now.getDate() - 1);
            let newDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            yesterday = await axios.get(`${baseUrl}/forecast.json?key=${req.apiKey}&q=${cityName}&dt=${formatDate(newDate)}`);
            yesterday = yesterday.data;
        }

        let location = weatherData.location;
        let current = weatherData.current;

        // Create a DTO  for the weather data
        let weatherDetails = {
            region: location.name,
            country: location.country,
            lat: location.lat,
            lon: location.lon,
            localtime: weatherData.forecast.forecastday[0].date,
            last_update: current.last_updated,
            temp_c: Math.ceil(current.temp_c),
            condition: current.condition.text,
            wind_kph: current.wind_kph,
            humidity: current.humidity,
            precip_mm: current.precip_mm,
            hourlyTemperatures: [
                {
                    time: (currentHour - 3 + 24) % 24,
                    temp: currentHour > 2 ? getDegreeForSpecificHour(weatherData, currentHour) : getDegreeForSpecificHour(yesterday, (currentHour - 3 + 24) % 24)
                },
                {
                    time: (currentHour - 2 + 24) % 24,
                    temp: currentHour > 1 ? getDegreeForSpecificHour(weatherData, currentHour) : getDegreeForSpecificHour(yesterday, (currentHour - 2 + 24) % 24)
                },
                {
                    time: (currentHour - 1 + 24) % 24,
                    temp: currentHour !== 0 ? getDegreeForSpecificHour(weatherData, currentHour) : getDegreeForSpecificHour(yesterday, (currentHour - 1 + 24) % 24)
                },
                {
                    time: currentHour,
                    temp: current.temp_c
                },
                {
                    time: currentHour + 1,
                    temp: currentHour !== 23 ? getDegreeForSpecificHour(weatherData, currentHour + 1) : getDegreeForSpecificHour(tomorrow, 0)
                }
            ]
        };

        // Send the weather details as JSON response
        res.json(weatherDetails);
    }
    catch (err) {
        next(err);
    }
};


//Validates the request parameters.
const valodation = (req) => {
    if (!req.query.cityName) {
        const error = new Error("City name is required");
        error.status = 400;
        return next(error);
    }

    // Check if API key is provided
    if (!req.apiKey) {
        const error = new Error("API key is missing");
        error.status = 500;
        return next(error);
    }
};

//Retrieves the temperature for a specific hour from the weather data.
const getDegreeForSpecificHour = (weatherHours, hour) => {
    weatherHours = weatherHours?.forecast?.forecastday[0].hour;
    let temp=weatherHours[hour]?.temp_c;
    return Math.ceil(temp)
};


// Formats a Date object into a string in the format YYYY-MM-DD.
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
