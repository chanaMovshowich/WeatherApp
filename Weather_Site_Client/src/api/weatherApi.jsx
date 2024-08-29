import axios from "axios";

let baseUrl = "http://localhost:5000/api/weather";

export const getWeatherDetails = (cityName) => {
  return axios.get(baseUrl, {
    params: {
      cityName: cityName
    }
  });
};