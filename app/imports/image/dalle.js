// generateImage.js
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateImage() {
  try {
    const response = await openai.createImage({
      model: 'text-davinci-003',
      prompt: 'a futuristic city skyline at sunset',
      n: 1,
      size: '1024x1024',
    });

    const imageUrl = response.data[0].url;
    console.log('Generated Image URL:', imageUrl);
  } catch (error) {
    console.error('Error generating image:', error);
  }
}

generateImage();
