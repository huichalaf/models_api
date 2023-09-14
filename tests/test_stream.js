fetch('http://localhost:3000/stream')
  .then(response => {
    const reader = response.body.getReader();
    return new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            push();
          });
        }
        push();
      }
    });
  })
  .then(stream => {
    // Aquí puedes hacer lo que quieras con el stream
    console.log('Stream recibido:', stream);
  })
  .catch(error => {
    console.error('Error al recibir el stream:', error);
  });