const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    budget: Number,
    location: String,
    propertyType: String,
    source: String,
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Site Visit', 'Closed'],
      default: 'New'
    },
    notes: [
      {
        text: String,
        date: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);