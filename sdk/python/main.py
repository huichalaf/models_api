import http.client
import time
from dotenv import load_dotenv
import os

load_dotenv()

server_ip = os.getenv("SERVER_IP")
port = int(os.getenv("SERVER_PORT"))
class llm:
    def __init__(self):
        self.user = ''
        self.token = ''

    def set_credentials(self, user, token):
        self.user = user
        self.token = token
        conn = http.client.HTTPConnection(server_ip, port)
        conn.request("POST", "/auth", f"user={self.user}&token={self.token}")
        response = conn.getresponse()
        if response.status == 200:
            if response.read().decode('utf-8') == '200':
                return True
            else:
                return False
        else:
            return False

    def chat(self, prompt, model="gpt-3.5-turbo", temperature=0.9, max_tokens=150, stream=True):

        conn = http.client.HTTPConnection("localhost", 3000)
        if stream: conn.request("POST", "/chat_stream", f"user={self.user}&token={self.token}&prompt={prompt}")
        elif not stream: conn.request("POST", "/chat_simple", f"user={self.user}&token={self.token}&prompt={prompt}")
        response = conn.getresponse()
        if response.status == 200 and stream:
            start = time.time()
            total_response = ''
            while True:
                chunk = response.read(4)  # Lee un bloque de datos (ajusta el tamaño según tus necesidades)
                if not chunk:
                    break  # Sale del bucle si no hay más datos
                try:
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
