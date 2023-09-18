const dotenv = require('dotenv');
const OpenAI = require('openai');
dotenv.config();

const openai_api_key = process.env.OPENAI_API_KEY;
const client = new OpenAI(openai_api_key);

export async function* chat(prompt: string, model: string, settings: any): AsyncGenerator<string>{
    console.log(model);
    const completion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: model,
        stream: true,
        temperature: settings.temperature,
        max_tokens: settings.max_tokens,
        top_p: settings.top_p,
        frequency_penalty: settings.frequency_penalty,
        presence_penalty: settings.presence_penalty,
      });
    for await (const part of completion) {
        yield part.choices[0]?.delta?.content || '';
    }
}

export async function simple_chat(prompt: string, model: string, settings: any): Promise<string>{
    console.log(model);
    const completion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: model,
        stream: false,
        temperature: settings.temperature,
        max_tokens: settings.max_tokens,
        top_p: settings.top_p,
        frequency_penalty: settings.frequency_penalty,
        presence_penalty: settings.presence_penalty,
    })
    return completion.choices[0]?.message.content || '';
}