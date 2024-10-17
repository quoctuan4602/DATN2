// src/models/Film.js
const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  video: { type: String, required: true },
  type: { type: String, required: true },
  rateCount: { type: Number, default: 0 },
  ratePeopleCount: { type: Number, default: 0 },
});

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;
