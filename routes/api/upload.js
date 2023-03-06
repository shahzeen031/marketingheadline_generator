let express = require('express'),
  multer = require('multer'),
  uuidv4 = require('uuid/v4'),
  router = express.Router();
let Interaction = require('../../models/Uploads');
const auth = require('../../middleware/auth');
let path = require('path');
const Users = require('../../models/Users');
const { check, validationResult } = require('express-validator');


// Define a route for users to view their interaction history
app.get('/interactions/:userId', async (req, res) => {
  try {
    // Query the database for user interaction history data
    const interaction = await Interaction.findOne({ userId: req.params.userId });

    if (!interaction) {
      return res.status(404).json({ message: 'Interaction not found' });
    }

    // Return the data as a response to the client
    res.json(interaction.interactions);
  } catch (err) {
    // Handle any errors that occur during the request
    res.status(500).json({ message: err.message });
  }
});

// Define a route for users to add a new interaction
app.post('/interactions/:userId', async (req, res) => {
  try {
    // Find the interaction for the specified user
    let interaction = await Interaction.findOne({ userId: req.params.userId });

    // If no interaction exists, create a new one
    if (!interaction) {
      interaction = new Interaction({
        userId: req.params.userId,
        interactions: [],
      });
    }

    // Add the new interaction to the array
    interaction.interactions.push({
      timestamp: new Date(),
      query: req.body.query,
      response: req.body.response,
    });

    // Save the updated interaction to the database
    await interaction.save();

    // Return the updated interaction as a response to the client
    res.json(interaction.interactions);
  } catch (err) {
    // Handle any errors that occur during the request
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
