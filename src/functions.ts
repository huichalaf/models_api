export async function get_prompt(body: string): Promise<string>{
    const prompt = body.split("&")[2].split("=")[1];
    return prompt;
}

export async function clean(body: string): Promise<string>{
    //reemplazamos los %40 por @
    body = body.replace(/%40/g, "@");
    //reemplazamos los %2B por +
    body = body.replace(/%2B/g, "+");
    //reemplazamos los %20 por espacios
    body = body.replace(/%20/g, " ");
    //reemplazamos los %3F por ?
    body = body.replace(/%3F/g, "?");
    //reemplazamos los %2C por ,
    body = body.replace(/%2C/g, ",");
    //reemplazamos los %C3%A9 por é
    body = body.replace(/%C3%A9/g, "é");
    //reemplazamos los %C3%AD por í
    body = body.replace(/%C3%AD/g, "í");
    //reemplazamos los %C3%B3 por ó
    body = body.replace(/%C3%B3/g, "ó");
    //reemplazamos los %C3%BA por ú
    body = body.replace(/%C3%BA/g, "ú");
    //reemplazamos los %C3%81 por Á
    body = body.replace(/%C3%81/g, "Á");
    //reemplazamos los %C3%89 por É
    body = body.replace(/%C3%89/g, "É");
    //reemplazamos los %C3%8D por Í
    body = body.replace(/%C3%8D/g, "Í");
    //reemplazamos los %C3%93 por Ó
    body = body.replace(/%C3%93/g, "Ó");
    //reemplazamos los %C3%9A por Ú
    body = body.replace(/%C3%9A/g, "Ú");
    return body;
}