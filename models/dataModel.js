const mongoose = require('mongoose');

// Define a schema
const dataSchema = new mongoose.Schema({
  show_id: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  director: { type: String },
  country: { type: String },
  date_added: { type: String },
  release_year: { type: Number, required: true },
  rating: { type: String },
  duration: { type: String },
  listed_in: { type: String },
  description: { type: String },
});
const movieSchema = new mongoose.Schema({
    dataSchema: [dataSchema]});



// Exporting the model
module.exports = mongoose.model('Data', movieSchema, 'FletNix');
