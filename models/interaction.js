const mongoose = require('mongoose');
const { bool } = require('prop-types');


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
      feedback:[
        {
          value:{
            type: String,
            required: true,
          },
          text:{
            type: String,
            required: true,
          }
        }
      ]
      
    },
  ],
});

module.exports = mongoose.model('interaction', interactionSchema);
