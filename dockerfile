FROM node:18

WORKDIR /app

# Criar usuário não-root
RUN useradd -m appuser

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

# Instala dependências (dev + prod)
RUN npm install

COPY src ./src
COPY prisma ./prisma

# Gera Prisma Client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Ajusta permissões
RUN chown -R appuser:appuser /app

# Usa usuário não-root
USER appuser

EXPOSE 4001

CMD ["npm", "start"]