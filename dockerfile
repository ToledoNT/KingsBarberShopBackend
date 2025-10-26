# Base Node.js
FROM node:20

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install --legacy-peer-deps

# Copia todo o código
COPY . .

# Compila TypeScript
RUN npm run build

# Expõe a porta do backend
EXPOSE 4001

# Comando para rodar o build compilado
CMD ["npm", "run", "start"]