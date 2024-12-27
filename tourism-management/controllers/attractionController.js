const Attraction = require('../models/Attraction');

const attractionController = {
    async getAllAttractions(req, res) {
        try {
            const attractions = await Attraction.find();
            res.json(attractions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getTopRated(req, res) {
        try {
            const topAttractions = await Attraction
                .find()
                .sort({ rating: -1 })
                .limit(5);
            res.json(topAttractions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async createAttraction(req, res) {
        try {
            const attraction = new Attraction(req.body);
            await attraction.save();
            res.status(201).json(attraction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async updateAttraction(req, res) {
        try {
            const attraction = await Attraction.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!attraction) {
                return res.status(404).json({ error: 'Attraction not found' });
            }
            res.json(attraction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteAttraction(req, res) {
        try {
            const attraction = await Attraction.findByIdAndDelete(req.params.id);
            if (!attraction) {
                return res.status(404).json({ error: 'Attraction not found' });
            }
            res.json({ message: 'Attraction deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = attractionController;