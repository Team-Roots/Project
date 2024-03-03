const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Hardcoded for demonstration only. Replace 'your_secret_key_here' with your actual key.
const OPENAI_API_KEY = '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';

// eslint-disable-next-line consistent-return
app.post('/api/generate-image', async (req, res) => {
  res.json({ message: 'Success' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
