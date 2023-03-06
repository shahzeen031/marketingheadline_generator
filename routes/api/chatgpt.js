
// Example API endpoint to generate a marketing headline
const express = require('express');
const app = express();

app.get('/generate-headline', async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) {
    return res.status(400).send('Prompt parameter is required');
  }

  const headline = await generate_headline(prompt);
  return res.send(headline);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
