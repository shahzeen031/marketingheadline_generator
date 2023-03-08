let express = require('express'),
  multer = require('multer'),
  uuidv4 = require('uuid/v4'),
  router = express.Router();
let Interaction = require('../../models/interaction');
const auth = require('../../middleware/auth');
let path = require('path');
const Users = require('../../models/Users');
const { check, validationResult } = require('express-validator');
const runCompletion = require('../../chatgpt')

// Define a route for users to view their interaction history
router.post('/getinteraction', auth, async (req, res) => {
  try {
    // Query the database for user interaction history data

    const interaction = await Interaction.findOne({ userId: req.body.userId });

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
router.post('/postInteraction', async (req, res) => {
  try {
    // Find the interaction for the specified user
    let interaction = await Interaction.findOne({ userId: req.body.userId });


    // If no interaction exists, create a new one
    if (!interaction) {
      interaction = new Interaction({
        userId: req.body.userId,
        interactions: [],
      });
    }
    // get response from fine tuned model
    let query = req.body.query.concat(":###");
    let response = await runCompletion(query)
    // Add the new interaction to the array

    interaction.interactions.unshift({
      timestamp: new Date(),
      query: req.body.query,
      response: response,
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


// post feedback on the fine tune model response 
router.post('/feedback', async (req, res) => {
  try {
    // Find the interaction for the specified user
    // let interaction = await Interaction.findOne({ userId: req.params.userId });



    const feedback = { value: 'good', text: 'Great!' };
    const result = await Interaction.updateOne(
      { userId: req.body.userId, 'interactions._id': req.body.I_id },
      { $push: { 'interactions.$.feedback': feedback } }
    ).exec();






    // Return the updated interaction as a response to the client
    res.json(result);
  } catch (err) {
    // Handle any errors that occur during the request
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
