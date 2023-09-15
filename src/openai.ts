const dotenv = require('dotenv');
const OpenAI = require('openai');
dotenv.config();

const openai_api_key = process.env.OPENAI_API_KEY;
const client = new OpenAI(openai_api_key);

export async function* chat(prompt: string): AsyncGenerator<string>{
    const completion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
        stream: true,
      });
    for await (const part of completion) {
        yield part.choices[0]?.delta?.content || '';
    }
}

export async function simple_chat(prompt: string): Promise<string>{
    const completion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
        stream: false,
    })
    console.log(completion);
    return completion.choices[0]?.message.content || '';
}