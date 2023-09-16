export async function get_prompt(body: string): Promise<string>{
    const prompt = body.split("&")[2].split("=")[1];
    return prompt;
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