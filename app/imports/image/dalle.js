// server.js
const express = require('express');
const openai = require('openai');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

openai.api_key = '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';

app.post('/generate-image', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.Image.create({
      model: "text-davinci-003", // Update the model name as necessary
      prompt: prompt,
      n: 1,
      size: "1024x1024"
    });
    const imageUrl = response.data[0].url;
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
