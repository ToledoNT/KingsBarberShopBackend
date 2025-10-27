"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.prismaConnect = prismaConnect;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
async function prismaConnect() {
    try {
        await exports.prisma.$connect();
        console.log(exports.prisma);
        console.log("Conexão com o Prisma foi bem-sucedida!");
    }
    catch (error) {
        console.error("Falha ao conectar com o Prisma:", error);
    }
}
