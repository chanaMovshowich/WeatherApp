import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import weatherRouter from './routes/weather.js';
import { errorHandling } from './middleware/errorHandling.js';

// Load environment variables from the .env file
config();

const app = express();

// Enable CORS for all incoming requests
app.use(cors());

// Enable JSON parsing for incoming requests
app.use(express.json());

const port = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Use custom error handling middleware
app.use(errorHandling);

// Define the base path for the weather API and link it to the weather router
app.use("/api/weather", weatherRouter);
