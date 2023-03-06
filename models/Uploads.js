const mongoose = require('mongoose');


// Define the schema for user interaction history data
const interactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  interactions: [
    {
      timestamp: {
        type: Date,
        required: true,
      },
      query: {
        type: String,
        required: true,
      },
      response: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('interaction', interactionSchema);
