import http.client
import time

conn = http.client.HTTPConnection("localhost", 3000)

conn.request("POST", "/auth", "user=papo9292@gmail.com&token=contraseña1234")

response = conn.getresponse()

if response.status == 200:
    start = time.time()
    print(response.read())
else:
    print("Error:", response.status, response.reason)

conn.close()
