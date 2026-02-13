const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const getWeather = async (req, res) => {
  const city = req.params.city;
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Weather API Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
};

module.exports = { getWeather };
