import {chat} from './main.js';


async function main() {
  try {
    chat(
        'papo9292@gmail.com',
        'JENGA9292jenga9292',
        'tuPregunta',
        (data) => {
          // Callback para onData: Procesar los datos a medida que llegan
          console.log('Dato recibido:', data);
        },
        (error) => {
          // Callback para onError: Manejar errores
          console.error('Error:', error);
        },
        () => {
          // Callback para onComplete: Realizar acciones al finalizar el stream
          console.log('Stream completado');
        }
      );      
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

main();