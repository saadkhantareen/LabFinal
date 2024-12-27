

// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { validateReview } = require('../middleware/validation');

router.post('/', validateReview, reviewController.createReview);
router.get('/', reviewController.getReviews);

module.exports = router;
