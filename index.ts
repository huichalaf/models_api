import { chat } from "./src/openai.ts";

const server = Bun.serve({
    async fetch(req) {
      const url = new URL(req.url);
      if (url.pathname === "/") return new Response("Hi");
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
      if (url.pathname === "/chat"){
        let prompt: string = await url.searchParams.get("prompt") || "Hello!";
        const response = chat(prompt);
        let value = await response.next();
        while (value.done !== true) {
          value = await response.next();
          console.log(value.value);
        }
      } 
      return new Response("404!");
    },
  });
  
  console.log(`Listening on http://localhost:${server.port} ...`);