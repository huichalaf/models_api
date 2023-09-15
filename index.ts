import { chat, simple_chat } from "./src/openai.ts";
import { auth_user, createStats, createUser, add_tokens_credit } from "./src/mongodb.ts";
const fs = require('fs');
import { get_prompt } from "./src/functions.ts";
//cargamos las variables de entorno
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
            //buscamos prompt en el body del post
            const body = await req.text();
            const status = await auth_user(body);
            if(status === false){
                return new Response("404");
            }
            const prompt = await get_prompt(body);
            console.log(body);
            const response = chat(prompt);
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
            console.log(body);
            const response = await simple_chat(prompt);
            console.log(response);
            return new Response(response);
            }
        if (url.pathname === "/auth"){
            //buscamos prompt en el body del post
            const body = await req.text();
            const status = await auth_user(body);
            if(status === false){
                return new Response("404");
            }
            return new Response("200");
        }
        if (url.pathname === "/create_user"){
            try {
                const body = await req.text();
                const name = body.split("&")[0].split("=")[1];
                const email = body.split("&")[1].split("=")[1];
                const password = body.split("&")[2].split("=")[1];
                const admin_token = body.split("&")[3].split("=")[1];
                if (admin_token !== ADMIN_TOKEN){
                    return new Response("404");
                }
                console.log(name, email, password);
                await createUser(name, email, password);
                await createStats(email, [], 0, 0);
                console.log('Usuario creado con éxito.');
            } catch (error) {
                console.error('Error al crear usuario:', error);
            }
        }
        if (url.pathname === "/add_tokens"){
            try {
                const body = await req.text();
                const user = body.split("&")[0].split("=")[1];
                const tokens = parseInt(body.split("&")[1].split("=")[1]);
                const admin_token = body.split("&")[2].split("=")[1];
                if (admin_token !== ADMIN_TOKEN){
                    return new Response("404");
                }
                await add_tokens_credit(user, tokens);
                console.log('Tokens añadidos con éxito.');
            } catch (error) {
                console.error('Error al añadir tokens:', error);
            }
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