// src/models/Film.js
const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  video: { type: String, required: true },
  type: { type: mongoose.Schema.Types.ObjectId, ref: "Type" }, // Reference to Type model
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "actor" }], // Array
  rateCount: { type: Number, default: 0 },
  ratePeopleCount: { type: Number, default: 0 },
  year: { type: Number, default: 2000 },
});

const Film = mongoose.model("Film", filmSchema);

module.exports = Film;
