import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import weatherRouter from './routes/weather.js';
import { errorHandling } from './middleware/errorHandling.js';

config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use(errorHandling);
// Define the base path for the weather API
app.use("/api/weather", weatherRouter);
