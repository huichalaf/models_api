import http from 'http';
import https from 'https';
import querystring from 'querystring';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const serverIp = process.env.SERVER_IP;
const serverPort = parseInt(process.env.SERVER_PORT);

export function chat(user, token, prompt, model, onData, onError, onComplete, temperature = 0.7, maxTokens = 500, stream = true, topP = 1, frequencyPenalty = 0, presencePenalty = 0) {
  const path = stream ? '/chat_stream' : '/chat_simple';

  const requestBody = {
    user: user,
    token: token,
    prompt: prompt,
    model: model,
    temperature: temperature,
    max_tokens: maxTokens,
    top_p: topP,
    frequency_penalty: frequencyPenalty,
    presence_penalty: presencePenalty,
  };

  const requestBodyString = querystring.stringify(requestBody);

  const options = {
    hostname: serverIp,
    port: serverPort,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(requestBodyString),
    },
  };

  const protocol = serverPort === 443 ? https : http;

  const req = protocol.request(options, (res) => {
    if (res.statusCode !== 200) {
      onError(new Error(`Request failed with status code ${res.statusCode}`));
      return;
    }

    res.on('data', (chunk) => {
      onData(chunk.toString('utf8')); // Llamar al callback con los datos recibidos
    });

    res.on('end', () => {
      onComplete(); // Llamar al callback de completado al final del stream
    });
  });

  req.on('error', (error) => {
    onError(error);
  });

  req.write(requestBodyString);
  req.end();
}
