const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

async function runCompletion () {
    const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "tell me story",
    temperature: 0.6,
    max_tokens: 1000,
    });
    console.log(completion.data.choices);
}





runCompletion();