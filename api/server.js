// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const port = 3000;

// mongoose.connect('mongodb://localhost:27017/fletNix', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Error connecting to MongoDB', err);
// });

// // schema for the excel
// const dataSchema = new mongoose.Schema({
//     _id: {
//         type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type
//         required: true,
//         unique: true,
//       },
//       show_id: {
//         type: String,
//         required: true,
//       },
//       type: {
//         type: String,
//         required: true,
//       },
//       title: {
//         type: String,
//         required: true,
//       },
//       director: {
//         type: String,
//         required: true,
//       },
//       country: {
//         type: String,
//         required: true,
//       },
//       date_added: {
//         type: String, // You can change this to a Date type if you want to use actual Date objects
//         required: true,
//       },
//       release_year: {
//         type: Number,
//         required: true,
//       },
//       rating: {
//         type: String,
//         required: true,
//       },
//       duration: {
//         type: String,
//         required: true,
//       },
//       listed_in: {
//         type: String,
//         required: true,
//       },
//       description: {
//         type: String,
//         required: false,  // Optional field
//       },
//     });
//     const movieSchema = new mongoose.Schema({
//         dataSchema: [dataSchema]});
 

// // creation of model
// const DataModel = mongoose.model('Data', movieSchema, 'FletNix'); // Disable auto index creation
// mongoose.set('autoIndex', false)

// // API Route to Fetch All Data
// app.get('/data', async (req, res) => {
//   try {
//     const data =
//      await DataModel.find();
//     res.json(data);
//   } catch (err) {
//     res.status(500).send('Error retrieving data');
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dataRoutes = require('../routes/dataRoutes');

const app = express();
const authRoutes = require('../routes/authRoutes'); // Import the authRoutes
const port = 3000;
const cors = require('cors');  // Import the cors module
// Enable CORS for all origins (can be customized)
// app.use(cors()); // Allow all domains to access the API
app.use(
  cors({
  //  origin:'https://uifletnix-anky-basus-projects.vercel.app/',
    credentials: true, // Allow credentials
    origin: 'http://localhost:4200', // Replace with your frontend URL
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
