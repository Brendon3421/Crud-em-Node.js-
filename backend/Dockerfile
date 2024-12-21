# Dockerfile para aplicação Node.js com TypeScript
FROM node:18-alpine

# Setar o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código para dentro do contêiner
COPY . .

# Compilar o código TypeScript para JavaScript
RUN npm run build

# Expor a porta em que sua aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
