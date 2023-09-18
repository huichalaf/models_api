import time
from dotenv import load_dotenv
import os
import requests

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

        auth_data = {
            'user': self.user,
            'token': self.token
        }

        response = requests.post(f"http://{server_ip}:{port}/auth", data=auth_data)

        if response.status_code == 200:
            if response.text == '200':
                return True
            else:
                return False
        else:
            return False

    def chat(self, prompt, model="gpt-3.5-turbo", temperature=0.9, max_tokens=150, stream=True):
        url = f"http://{server_ip}:{port}"

        data = {
            'user': self.user,
            'token': self.token,
            'prompt': prompt
        }

        if stream:
            response = requests.post(f"{url}/chat_stream", data=data, stream=True)
            if response.status_code == 200:
                start = time.time()
                for chunk in response.iter_content(chunk_size=4):
                    try:
                        yield chunk.decode('utf-8')
                    except Exception as e:
                        pass
                print("\nTiempo de lectura:", time.time() - start)
            else:
                print("Error:", response.status_code, response.reason)
        elif not stream:
            response = requests.post(f"{url}/chat_simple", data=data)
            if response.status_code == 200:
                print(response.text)
                return response.text
            else:
                print("Error:", response.status_code, response.reason)