import time
from dotenv import load_dotenv
import os
import requests

load_dotenv()

server_ip = os.getenv("SERVER_IP")

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

        response = requests.post(f"http://{server_ip}/auth", data=auth_data)

        if response.status_code == 200:
            if response.text == '200':
                return True
            else:
                return False
        else:
            return False

    def chat(self, prompt, model="gpt-3.5-turbo", temperature=0.9, max_tokens=500, stream=True, top_p=1.0, frecuency_penalty = 0, prescence_penalty = 0):
        url = f"http://{server_ip}"

        data = {
            'user': self.user,
            'token': self.token,
            'prompt': prompt,
            'model': model,
            'temperature': temperature,
            'max_tokens': max_tokens,
            'top_p': top_p,
            'frecuency_penalty': frecuency_penalty,
            'prescence_penalty': prescence_penalty
        }

        if stream:
            response = requests.post(f"{url}/chat_stream", data=data, stream=True)
            if response.status_code == 200:
                for chunk in response.iter_content(chunk_size=4):
                    try:
                        yield chunk.decode('utf-8')
                    except Exception as e:
                        pass
            else:
                return f"{response.status_code}, {response.reason}"
        elif not stream:
            response = requests.post(f"{url}/chat_simple", data=data)
            if response.status_code == 200:
                return response.text
            else:
                return f"{response.status_code}, {response.reason}"