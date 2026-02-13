# Weather App

Full Stack Weather Application with Real-time Messaging.

## Stack
- **Frontend**: React (Vite), React Router, Socket.io-client, Axios, React Toastify
- **Backend**: Express, Socket.io, JWT, Axios
- **API**: OpenWeatherMap

## Setup & Run

### 1. Backend
```bash
cd backend
npm install
npm start
```
Server runs on http://localhost:5000

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Client runs on http://localhost:5173

## Usage
1.  **Login**: Use credentials `admin` / `password`.
2.  **Home**: Enter a city name (e.g., "London") and click "Get Weather".
    -   This fetches current weather data.
    -   It also subscribes you to real-time messages for that city.
3.  **Send Message** (to test real-time feature):
    -   Use Postman or Curl to send a POST request:
    ```bash
    curl -X POST http://localhost:5000/api/message \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
      -d '{"city": "London", "message": "Hello Londoners!"}'
    ```
    -   You will see a toast notification on the frontend if you have searched for "London".

## Environment Variables
The backend uses a `.env` file with the following keys (already pre-filled):
-   `PORT`
-   `OPENWEATHER_API_KEY`
-   `JWT_SECRET`
