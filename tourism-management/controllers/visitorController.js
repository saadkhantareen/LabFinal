
// controllers/visitorController.js
const Visitor = require('../models/Visitor');  // Add this line at the top
const Review = require('../models/Review');

const visitorController = {
    async createVisitor(req, res) {
        try {
            const visitor = new Visitor(req.body);
            await visitor.save();
            res.status(201).json(visitor);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getVisitorActivity(req, res) {
        try {
            const visitors = await Visitor.aggregate([
                {
                    $lookup: {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'visitor',
                        as: 'reviews'
                    }
                },
                {
                    $project: {
                        name: 1,
                        email: 1,
                        reviewCount: { $size: '$reviews' },
                        visitedCount: { $size: '$visitedAttractions' }
                    }
                }
            ]);
            res.json(visitors);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateVisitedAttractions(req, res) {
        try {
            const visitor = await Visitor.findByIdAndUpdate(
                req.params.id,
                { $push: { visitedAttractions: req.body.attractionId } },
                { new: true }
            );
            if (!visitor) {
                return res.status(404).json({ error: 'Visitor not found' });
            }
            res.json(visitor);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = visitorController;