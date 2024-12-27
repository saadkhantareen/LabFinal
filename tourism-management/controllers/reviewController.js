

// controllers/reviewController.js
const Review = require('../models/Review');
const Attraction = require('../models/Attraction');

const reviewController = {
    async createReview(req, res) {
        try {
            const { attractionId, visitorId, score, comment } = req.body;

            const review = new Review({
                attraction: attractionId,
                visitor: visitorId,
                score,
                comment
            });

            await review.save();
            
            // Update attraction rating
            const reviews = await Review.find({ attraction: attractionId });
            const averageRating = reviews.reduce((acc, rev) => acc + rev.score, 0) / reviews.length;
            
            await Attraction.findByIdAndUpdate(attractionId, {
                rating: Number(averageRating.toFixed(1))
            });
            
            res.status(201).json(review);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getReviews(req, res) {
        try {
            const reviews = await Review.find()
                .populate('attraction', 'name')
                .populate('visitor', 'name');
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = reviewController;