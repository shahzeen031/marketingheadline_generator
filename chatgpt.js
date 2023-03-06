const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);



const dataset = fs.readFileSync('./marketing_headlines.txt', 'utf-8').split('\n');

// Function to fine-tune the GPT-3 model
const fine_tune_model = async () => {
  const prompt = `Fine-tune the GPT-3 model on the "100 marketing headlines" dataset:\n\n${dataset.join('\n')}\n\n`;
  const training_parameters = {
    'model': 'text-davinci-002',
    'prompt': prompt,
    'temperature': 0.7,
    'max_tokens': 64,
    'top_p': 1,
    'frequency_penalty': 0,
    'presence_penalty': 0,
    'stop': '\n',
    'n': 1,
    'stream': false,
    'logprobs': null,
    'echo': false,
    'stop': '\n',
  };

  const training_result = await openai.createCompletion(training_parameters);
  console.log(`Fine-tuned model created with ID: ${training_result.id}`);
  generate_headline("Hello how are you")

}


// Function to generate a marketing headline using the fine-tuned GPT-3 model
const generate_headline = async (prompt) => {

  const completions = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: prompt,
    max_tokens: 60,
    n: 1,
    stop: '\n',
  });

  const headline = completions;
  console.log(headline)
  return headline;
}
module.exports = generate_headline;
module.exports = fine_tune_model;