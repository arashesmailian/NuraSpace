const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// Import Routes and Modules
const authRoutes = require('./routes/auth');
const weatherRoutes = require('./routes/weather');
const messageRoutes = require('./routes/message')(io); // Initialize message routes with io
const socketHandler = require('./socket/socket');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes); 
app.use('/api/weather', weatherRoutes);
app.use('/api/message', messageRoutes); // Use the initialized router

// Initialize Socket.io logic
socketHandler(io);

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
