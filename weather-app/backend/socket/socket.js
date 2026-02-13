const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (io) => {
  // Middleware for Socket.io authentication
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return next(new Error("Authentication error"));
      socket.user = decoded;
      next();
    });
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.user.username);

    socket.on('join_city', (city) => {
      if (city) {
        const room = city.toLowerCase();
        socket.join(room);
        console.log(`User ${socket.user.username} joined room: ${room}`);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
