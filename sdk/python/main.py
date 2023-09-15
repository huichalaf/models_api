import http.client
import time
from dotenv import load_dotenv
import os

load_dotenv()

class llm:
    def __init__(self):
        self.user = ''
        self.token = ''

    def set_credentials(self, user, token):
        self.user = user
        self.token = token

    def chat(self, prompt, model, temperature=0.9, max_tokens=150, stream=True):
        
        conn = http.client.HTTPConnection("localhost", 3000)
        if stream: conn.request("POST", "/chat_stream", "prompt=hola como estas?")
        elif not stream: conn.request("POST", "/chat_simple", "prompt=hola como estas?")
        response = conn.getresponse()
        if response.status == 200 and stream:
            start = time.time()
            total_response = ''
            while True:
                chunk = response.read(4)  # Lee un bloque de datos (ajusta el tamaño según tus necesidades)
                if not chunk:
                    break  # Sale del bucle si no hay más datos
                try:
                    print(chunk.decode('utf-8'))
                    yield chunk.decode('utf-8')  # Decodifica y muestra el bloque de datos
                except:
                    pass
            print("\nTiempo de lectura:", time.time() - start)
            print("Total de caracteres:", len(total_response))
            print(total_response)
        elif response.status == 200 and not stream:
            print(response.read())
            return response.read()
        else:
            print("Error:", response.status, response.reason)
        conn.close()
