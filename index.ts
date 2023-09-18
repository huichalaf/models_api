import { chat, simple_chat } from "./src/openai.ts";
import { auth_user } from "./src/mongodb.ts";
const fs = require('fs');
import { get_prompt, get_model, clean, get_settings } from "./src/functions.ts";
const dotenv = require('dotenv');
dotenv.config();
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

const server = Bun.serve({
    fetch: async (req) => {
        const url = new URL(req.url);
        if (url.pathname === "/"){
            return new Response("Hello World!");
        }
        if (url.pathname === "/chat_stream"){
            let body = await req.text();
            body = await clean(body);
            const status = await auth_user(body);
            if(status === false){
                return new Response("404");
            }
            const prompt = await get_prompt(body);
            const model = await get_model(body);
            const settings = await get_settings(body);
            const response = chat(prompt, model, settings);
            let value = await response.next();
            const chat_response = new ReadableStream({
                type: "direct",
                async pull(controller) {
                while (value.done !== true) {
                    let mensaje: string = value.value;
                    controller.write(mensaje);
                    value = await response.next();
                }
                controller.close();
                }
                });
            return new Response(chat_response);
        }
        if (url.pathname === "/chat_simple"){
            //buscamos prompt en el body del post
            const body = await req.text();
            const status = await auth_user(body);
            if(status === false){
                return new Response("404");
            }
            const prompt = await get_prompt(body);
            const model = await get_model(body);
            const settings = await get_settings(body);
            const response = await simple_chat(prompt, model, settings);
            console.log(response);
            return new Response(response);
            }
        if (url.pathname === "/auth"){
            //buscamos prompt en el body del post
            let body = await req.text();
            const status = await auth_user(body);
            if(status === false){
                return new Response("404");
            }
            return new Response("200");
        }
        return new Response("404!");
    },
    port: 3000,
    /*tls: {
        key: fs.readFileSync("./mi_certificado.key", 'utf8'),
        cert: fs.readFileSync("./mi_certificado.crt", 'utf8'),
    },*/
});
console.log(`Listening on http://localhost:${server.port} ...`);