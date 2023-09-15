export async function get_prompt(body: string): Promise<string>{
    const prompt = body.split("&")[2].split("=")[1];
    return prompt;
}