const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

const messageRoutes = (io) => {
    router.post('/', authenticateToken, sendMessage(io));
    router.get('/:city', authenticateToken, getMessages); // New route to get history
    return router;
};

module.exports = messageRoutes;
