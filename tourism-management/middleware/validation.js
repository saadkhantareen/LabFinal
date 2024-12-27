const mongoose = require('mongoose');

// Validation middleware for Attraction
const validateAttraction = (req, res, next) => {
    const { name, location, entryFee } = req.body;
    
    // Check required fields
    if (!name || !location || entryFee === undefined) {
        return res.status(400).json({ 
            error: 'Name, location, and entry fee are required' 
        });
    }

    // Validate entry fee
    if (entryFee < 0) {
        return res.status(400).json({ 
            error: 'Entry fee cannot be negative' 
        });
    }

    next();
};

// Validation middleware for Review
const validateReview = (req, res, next) => {
    const { attractionId, visitorId, score } = req.body;
    
    // Check required fields
    if (!attractionId || !visitorId || !score) {
        return res.status(400).json({ 
            error: 'Attraction ID, visitor ID, and score are required' 
        });
    }

    // Validate score
    if (score < 1 || score > 5) {
        return res.status(400).json({ 
            error: 'Score must be between 1 and 5' 
        });
    }

    // Validate MongoDB ObjectIds
    if (!mongoose.Types.ObjectId.isValid(attractionId) || 
        !mongoose.Types.ObjectId.isValid(visitorId)) {
        return res.status(400).json({ 
            error: 'Invalid attraction ID or visitor ID' 
        });
    }

    next();
};

// Validation middleware for Visitor
const validateVisitor = (req, res, next) => {
    const { name, email } = req.body;
    
    // Check required fields
    if (!name || !email) {
        return res.status(400).json({ 
            error: 'Name and email are required' 
        });
    }

    // Basic email validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            error: 'Invalid email format' 
        });
    }

    next();
};

module.exports = {
    validateAttraction,
    validateReview,
    validateVisitor
};
