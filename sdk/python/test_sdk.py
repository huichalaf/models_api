from main import llm
def recibir_chat():
    chat_instance = llm()
    chat_instance.set_credentials("papo9292@gmail.com", "password1234")
    for chunk in chat_instance.chat("hola como estas?", stream=True, model="math_problem_solver"):
        print(chunk)
    print("Stream completed")
recibir_chat()
