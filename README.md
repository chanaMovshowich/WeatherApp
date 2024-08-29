# Weather Web Application

## Overview
The Weather Web Application is a responsive and accessible web app built with React for the frontend and Node.js for the backend. The application allows users to enter a city name and view current weather information for that city, including temperature, humidity, and weather conditions.

## Features
- **Real-Time Weather Data:** Retrieves and displays weather information for the city entered by the user.
- **Responsive Design:** Optimized for desktops, tablets, and mobile devices.
- **User-Friendly Interface:** Simple and intuitive interface with clear data presentation.
- **Error Handling:** Manages various states such as missing data, invalid input, and API errors.
- **Accessibility:** Implements accessibility best practices, including ARIA roles and alternative text for images.

## Screenshots
![image](https://github.com/user-attachments/assets/10e1545d-4e35-4868-81b2-c00c71cbf4c4)

## Installation and Setup

### Prerequisites
- Node.js (version 14 or later)
- npm (Node Package Manager)

### Getting the Code
1. Clone the repository:
    ```bash
    https://github.com/chanaMovshowich/WeatherApp.git
    cd WeatherApp
    ```

### Backend Setup
1. Navigate to the backend directory:
    ```bash
    cd Weather_Site_Backend
    ```
2. Install backend dependencies:
    ```bash
    npm install
    ```
3. Create and configure environment variables:
    - Create a `.env` file in the backend directory and add your WeatherAPI key:
      ```plaintext
      API_KEY=your_weather_api_key
      ```
4. Start the backend server:
    ```bash
    npm start
    ```
    The backend server will run on `http://localhost:5000` by default.

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd ../Weather_Site_Client
    ```
2. Install frontend dependencies:
    ```bash
    npm install
    ```
3. Start the frontend development server:
    ```bash
    npm start
    ```
    The frontend application will be accessible at `http://localhost:5173`.

## Contact
For further information or inquiries, you can contact me at [chana6773439@gmail.com](mailto:chana6773439@gmail.com).
