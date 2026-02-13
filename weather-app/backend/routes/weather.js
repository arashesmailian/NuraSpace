const express = require('express');
const { getWeather } = require('../controllers/weatherController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/:city', authenticateToken, getWeather);

module.exports = router;
