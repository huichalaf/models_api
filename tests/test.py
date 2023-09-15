import http.client
import time

conn = http.client.HTTPConnection("localhost", 3000)

conn.request("POST", "/chat_simple", "prompt=hola como estas?")

response = conn.getresponse()

if response.status == 200:
    start = time.time()
    total_response = ''
    while True:
        chunk = response.read(4)  # Lee un bloque de datos (ajusta el tamaño según tus necesidades)
        if not chunk:
            break  # Sale del bucle si no hay más datos
        try:
            print(chunk.decode('utf-8'))  # Decodifica y muestra el bloque de datos
            total_response += chunk.decode('utf-8')
        except:
            pass
    print("\nTiempo de lectura:", time.time() - start)
    print("Total de caracteres:", len(total_response))
    print(total_response)
else:
    print("Error:", response.status, response.reason)

conn.close()
