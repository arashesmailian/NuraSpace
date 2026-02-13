const { messages } = require('../config/db');

const sendMessage = (io) => (req, res) => {
  const { city, message } = req.body;

  if (!city || !message) {
    return res.status(400).json({ message: 'City and message are required' });
  }

  const cityKey = city.toLowerCase();
  const timestamp = new Date().toISOString();
  const newMessage = { text: message, city: city, timestamp };

  // Store message in memory
  if (!messages[cityKey]) {
    messages[cityKey] = [];
  }
  messages[cityKey].push(newMessage);

  // Broadcast to the specific city room
  io.to(cityKey).emit('new_message', newMessage);

  res.json({ success: true, message: 'Message sent' });
};

const getMessages = (req, res) => {
  const city = req.params.city;
  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }
  const cityKey = city.toLowerCase();
  const cityMessages = messages[cityKey] || [];
  res.json(cityMessages);
};

module.exports = { sendMessage, getMessages };
