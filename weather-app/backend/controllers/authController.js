const { users } = require('../config/db');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if user exists
  const existingUser = users.find(u => u.username === username);

  if (existingUser) {
    // User exists, check password
    if (existingUser.password === password) {
      // Password matches, generate token
      const token = jwt.sign({ username: existingUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, username: existingUser.username, message: 'Login successful' });
    } else {
      // Password does not match
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    // User does not exist, register new user
    const newUser = { username, password };
    users.push(newUser);
    
    // Generate token for new user
    const token = jwt.sign({ username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json({ token, username: newUser.username, message: 'User registered and logged in' });
  }
};

module.exports = { login };
