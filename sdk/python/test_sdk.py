from main import llm
def recibir_chat():
    chat_instance = llm()  # Reemplaza "ChatClass" con el nombre de tu clase que contiene esta función
    chat_instance.set_credentials("papo9292@gmail.com", "password1234")  # Reemplaza "user" y "token" con tus credenciales
    for chunk in chat_instance.chat("hola como estas?", stream=True):
        # Aquí puedes procesar cada chunk que se envía desde el generador
        # Por ejemplo, podrías imprimirlo en la consola o realizar otras acciones
        print(chunk)

# Llama a la función para recibir el yield
recibir_chat()
