// src/controllers/commentController.js
const Comment = require('../models/Comment');

// Create a comment
const createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all comments for a specific film
const getCommentsByFilm = async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  try {
    const comments = await Comment.find({ filmId: req.params.filmId })
      .populate({
        path: 'userId',
        select: 'fullName',
      })
      .limit(limit);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComment,
  getCommentsByFilm,
  updateComment,
  deleteComment,
};
