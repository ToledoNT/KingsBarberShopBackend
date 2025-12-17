FROM node:18

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

# Instala todas as dependências (incluindo dev)
RUN npm install

COPY src ./src
COPY prisma ./prisma

# Gera Prisma Client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

EXPOSE 4001

# Use NODE_ENV=production no runtime
CMD ["npm", "start"]