import { chat, simple_chat } from "./src/openai.ts";

const server = Bun.serve({
    async fetch(req) {
      const url = new URL(req.url);
      if (url.pathname === "/"){
        return new Response("Hello World!");
      }
      if (url.pathname === "/stream") {
        let counter = 0;
        const stream = new ReadableStream({
          start(controller) {
            while (counter <= 10000000) {
              controller.enqueue("hello");
              controller.enqueue("world");
              counter++;
            }
            counter = 0;
            controller.close();
          },
        });
        return new Response(stream);
      }
      if (url.pathname === "/chat_stream"){
        //buscamos prompt en el body del post
        const body = await req.text();
        const prompt = body.split("=")[1];
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
            const prompt = body.split("=")[1];
            console.log(body);
            const response = await simple_chat(prompt);
            console.log(response);
            return new Response(response);
            }
      return new Response("404!");
    },
  });
  
  console.log(`Listening on http://localhost:${server.port} ...`);