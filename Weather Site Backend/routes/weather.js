import { Router } from 'express';
import { addWeatherApiKey } from '../middleware/addWeatherApiKey.js';
import { getTheWeatherForecast } from '../controllers/weather.js';

const weatherRouter = Router();

// Define a GET route for the root of the weather path
weatherRouter.get("/", addWeatherApiKey, getTheWeatherForecast);

export default weatherRouter;
