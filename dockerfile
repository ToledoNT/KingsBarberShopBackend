FROM node:18

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

RUN npm install

COPY src ./src
COPY prisma ./prisma

RUN npx prisma generate

RUN npm run build

EXPOSE 4001

CMD ["npm", "start"]