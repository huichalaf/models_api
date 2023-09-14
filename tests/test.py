import http.client
import time
conn = http.client.HTTPConnection("localhost", 3000)
conn.request("GET", "/stream")
response = conn.getresponse()

if response.status == 200:
    start = time.time()
    stream = response.readable()
    for chunk in response.read():
        pass
        #print(chunk)
    print(time.time()-start)
else:
    print("Error:", response.status, response.reason)

conn.close()