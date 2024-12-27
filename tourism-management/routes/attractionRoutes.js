// routes/attractionRoutes.js
const express = require('express');
const router = express.Router();
const attractionController = require('../controllers/attractionController');
const { validateAttraction } = require('../middleware/validation');

router.get('/', attractionController.getAllAttractions);
router.get('/top-rated', attractionController.getTopRated);
router.post('/', validateAttraction, attractionController.createAttraction);
router.put('/:id', validateAttraction, attractionController.updateAttraction);
router.delete('/:id', attractionController.deleteAttraction);

module.exports = router;
