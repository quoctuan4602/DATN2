// src/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controller/Comment');

// CRUD operations for comments
router.post('/', commentController.createComment); // Create
router.get('/film/:filmId', commentController.getCommentsByFilm); // Read all comments for a film
router.put('/:id', commentController.updateComment); // Update
router.delete('/:id', commentController.deleteComment); // Delete

module.exports = router;
