import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function prismaConnect(retries = 10, delay = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$connect();
      console.log("✅ Conexão com o Prisma foi bem-sucedida!");
      return;
    } catch (error) {
      console.error(`❌ Falha ao conectar com o Prisma. Tentativa ${i + 1} de ${retries}`);
      console.error(error);
      if (i < retries - 1) {
        console.log(`⏳ Tentando novamente em ${delay / 1000}s...`);
        await new Promise(res => setTimeout(res, delay));
      }
    }
  }
  console.error("🔥 Não foi possível conectar ao banco após várias tentativas.");
  process.exit(1); // opcional: encerra a aplicação se não conectar
}