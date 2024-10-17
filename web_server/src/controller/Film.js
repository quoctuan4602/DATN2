const Film = require("../models/Film");

const create = async (req, res) => {
  const name = req.body["name"];
  const type = req.body["type"];
  const description = req.body["description"];

  const image = req.files["image"] ? req.files["image"][0].filename : null;
  const video = req.files["video"] ? req.files["video"][0].filename : null;

  const film = new Film({ name, description, image, video, type });

  try {
    const savedFilm = await film.save();
    res.status(201).json(savedFilm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all films
const getAll = async (req, res) => {
  try {
    const films = await Film.find();
    res.json(films);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a film by ID
const getById = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) return res.status(404).json({ message: "Film not found" });
    res.json(film);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const film = await Film.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!film) return res.status(404).json({ message: "Film not found" });
    res.json(film);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const film = await Film.findByIdAndDelete(req.params.id);
    if (!film) return res.status(404).json({ message: "Film not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search films by name
const search = async (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res
      .status(400)
      .json({ message: "Name query parameter is required" });
  }

  try {
    const films = await Film.find({ name: { $regex: name, $options: "i" } });
    res.status(200).json(films);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search films by type
const getType = async (req, res) => {
  const { type } = req.params;

  if (!type) {
    return res
      .status(400)
      .json({ message: "Type query parameter is required" });
  }

  try {
    const films = await Film.find({ type: { $regex: type, $options: "i" } });
    res.status(200).json(films);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addRating = async (req, res) => {
  try {
    const { filmId, rating } = req.body;

    // Check if the rating is valid
    if (rating < 1 || rating > 10) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 10" });
    }

    // Find the film by ID
    const film = await Film.findById(filmId);
    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }

    // Update the rateCount and ratePeopleCount
    film.rateCount += rating;
    film.ratePeopleCount += 1;

    // Save the updated film
    await film.save();

    // Calculate the average rating
    const averageRating = film.rateCount / film.ratePeopleCount;

    res.status(200).json({
      message: "Rating added successfully",
      averageRating: averageRating.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding the rating",
      error: error.message,
    });
  }
};
module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  search,
  getType,
  addRating,
};
