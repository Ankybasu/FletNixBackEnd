require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dataRoutes = require('../routes/dataRoutes');

const app = express();
const authRoutes = require('../routes/authRoutes'); // Import the authRoutes
const port = 3000;
const cors = require('cors');  // Import the cors module

//app.use(cors()); // Allow all domains to access the API
const allowedOrigins = [
  'https://uifletnix-anky-basus-projects.vercel.app', // Frontend production URL
  'https://fletnixx.vercel.app',// Local development
  'https://your-other-app.example.com' // Add more as needed
];

// Configure CORS with dynamic origin handling
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy does not allow access from origin ${origin}`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware to parse JSON bodies
app.use(express.json()); // This is needed to parse JSON request bodies
// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
mongoose
  .connect(
    //'mongodb://localhost:27017/fletNix'
    mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

// Use routes
app.use('/data', dataRoutes);
app.use('/auth', authRoutes); // Use the authentication routes

  

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
