# Dockerfile para aplicação React
FROM node:18-alpine

# Setar o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código para dentro do contêiner
COPY . .

# Rodar a build do React
RUN npm run build

# Instalar servidor HTTP simples para servir a aplicação
RUN npm install -g serve

# Expor a porta em que sua aplicação vai rodar
EXPOSE 3000

# Comando para servir a aplicação
CMD ["serve", "-s", "build"]
