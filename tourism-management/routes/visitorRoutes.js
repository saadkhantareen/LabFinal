// routes/visitorRoutes.js
const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');  // Add this line
const visitorController = require('../controllers/visitorController');
const { validateVisitor } = require('../middleware/validation');

// Get all visitors
router.get('/', async (req, res) => {
    try {
        const visitors = await Visitor.find();
        res.json(visitors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new visitor
router.post('/', validateVisitor, visitorController.createVisitor);

// Get visitor activity
router.get('/activity', visitorController.getVisitorActivity);

// Update visited attractions
router.post('/:id/visit', visitorController.updateVisitedAttractions);

module.exports = router;

