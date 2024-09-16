// Middleware to add the weather API key to the request object.
export const addWeatherApiKey = (req, res, next) => {
    req.apiKey = process.env.APIKEY;
    next();
}