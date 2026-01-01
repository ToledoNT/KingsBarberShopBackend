FROM node:18

WORKDIR /app

# Criar usuário não-root
RUN useradd -m appuser

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

RUN npm install

COPY src ./src
COPY prisma ./prisma

RUN npx prisma generate
RUN npm run build

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 4001

CMD ["npm", "start"]