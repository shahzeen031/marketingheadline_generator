const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const configuration = new Configuration({
  apiKey: process.env.API_TOKEN,
});
const openai = new OpenAIApi(configuration);

// fine tuned chatgpt model 
async function runCompletion (promt) {
    const completion = await openai.createCompletion({
        model: "davinci:ft-personal:marketing-headlines-model-2023-03-07-11-32-07",
        prompt: promt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["END"],
    });
    
   return completion.data.choices[0].text;
}

//usage
//runCompletion("new dinner decor ideas:###");
module.exports = runCompletion;
