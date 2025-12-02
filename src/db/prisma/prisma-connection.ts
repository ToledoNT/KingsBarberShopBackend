import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient(); // nada de datasources aqui

export async function prismaConnect() {
  try {
    await prisma.$connect();
    console.log("Conexão com o Prisma foi bem-sucedida!");
  } catch (error) {
    console.error("Falha ao conectar com o Prisma:", error);
  }
}