# Weather App

Full Stack Weather Application with Real-time Messaging.

## Stack
- **Frontend**: React (Vite), React Router, Socket.io-client, Axios, React Toastify, Tailwind CSS
- **Backend**: Express, Socket.io, JWT, Axios
- **API**: OpenWeatherMap

## Setup & Run

### 1. Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   - Create a `.env` file in the `backend` directory.
   - Copy the contents from `.env.example`:
     ```bash
     cp .env.example .env
     ```
   - **Important**: Open `.env` and fill in your actual keys:
     ```
     PORT=5001
     OPENWEATHER_API_KEY=your_real_openweather_api_key
     JWT_SECRET=your_secret_random_string
     ```
4. Start the server:
   ```bash
   npm start
   ```
   Server runs on http://localhost:5001

### 2. Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Client runs on http://localhost:5173

## Usage
1.  **Login**: Enter any username and password. If the user doesn't exist, it will be automatically created.
2.  **Home**: Enter a city name (e.g., "London") and click "Search".
    -   This fetches current weather data.
    -   It also subscribes you to real-time messages for that city.
3.  **Send Message** (to test real-time feature):
    -   Use Postman or Curl to send a POST request:
    ```bash
    curl -X POST http://localhost:5001/api/message \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
      -d '{"city": "london", "message": "Hello Londoners!"}'
    ```
    -   You will see a toast notification on the frontend if you have searched for "London".
