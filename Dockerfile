FROM jarredsumner/bun:edge

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN bun install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Expón el puerto 3000 (puerto por defecto de SvelteKit)
EXPOSE 3000

# Comando para ejecutar la aplicación en modo producción
CMD ["bun", "run", "start"]