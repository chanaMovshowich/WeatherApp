export const addWeatherApiKey = (req, res, next) => {
    req.apiKey = process.env.APIKEY;
    next();
}