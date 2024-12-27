const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  visitedAttractions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attraction'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);
