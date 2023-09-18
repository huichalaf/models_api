import * as fs from 'fs';


export async function get_prompt(body: string): Promise<string>{
    const prompt = body.split("&")[2].split("=")[1];
    return prompt;
}

export async function get_model(body: string): Promise<string>{
    const model = body.split("&")[3].split("=")[1];
    //buscamos en el archivo models.json
    const data = fs.readFileSync('src/models.json', 'utf8');
    const obj = JSON.parse(data);
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].name === model) {
            return obj[i].model;
        }
    }

    return 'gpt-3.5-turbo';
}

export async function get_settings(body: string): Promise<any>{

    const temperature = body.split("&")[4].split("=")[1];
    const max_tokens = body.split("&")[5].split("=")[1];
    const top_p = body.split("&")[6].split("=")[1];
    const frequency_penalty = body.split("&")[7].split("=")[1];
    const presence_penalty = body.split("&")[8].split("=")[1];
    const max_tokens_int = parseInt(max_tokens);
    const temperature_int = parseFloat(temperature);
    const top_p_int = parseFloat(top_p);
    const frequency_penalty_int = parseFloat(frequency_penalty);
    const presence_penalty_int = parseFloat(presence_penalty);

    const settings = {
        "temperature": temperature_int,
        "max_tokens": max_tokens_int,
        "top_p": top_p_int,
        "frequency_penalty": frequency_penalty_int,
        "presence_penalty": presence_penalty_int,
    };
    return settings;
}

export async function clean(body: string): Promise<string>{
    body = body.replace(/%40/g, "@");
    body = body.replace(/%2B/g, "+");
    body = body.replace(/%20/g, " ");
    body = body.replace(/%3F/g, "?");
    body = body.replace(/%2C/g, ",");
    body = body.replace(/%C3%A9/g, "é");
    body = body.replace(/%C3%AD/g, "í");
    body = body.replace(/%C3%B3/g, "ó");
    body = body.replace(/%C3%BA/g, "ú");
    body = body.replace(/%C3%81/g, "Á");
    body = body.replace(/%C3%89/g, "É");
    body = body.replace(/%C3%8D/g, "Í");
    body = body.replace(/%C3%93/g, "Ó");
    body = body.replace(/%C3%9A/g, "Ú");
    body = body.replace(/%C3%B1/g, "ñ");
    body = body.replace(/%C3%91/g, "Ñ");
    body = body.replace(/%C3%BC/g, "ü");
    body = body.replace(/%C3%9C/g, "Ü");
    body = body.replace(/%C3%A1/g, "á");    
    return body;
}