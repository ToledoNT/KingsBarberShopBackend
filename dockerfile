FROM node:18

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

# Instala todas as dependências (incluindo dev) para build
RUN npm install

COPY src ./src
COPY prisma ./prisma

# Se quiser gerar o Prisma client no build
# RUN npx prisma generate

# Build TypeScript
RUN npm run build

EXPOSE 4001

# Use NODE_ENV=production no runtime
CMD ["npm", "start"]