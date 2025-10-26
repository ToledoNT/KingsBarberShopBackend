"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseLog = void 0;
const prisma_connection_1 = require("../prisma-connection");
class DatabaseLog {
    async create(value) {
        let retry = 1;
        const maxRetries = 5;
        while (retry < maxRetries) {
            try {
                await prisma_connection_1.prisma.log.create({
                    data: { value: JSON.stringify(value) },
                });
                return;
            }
            catch (error) {
                if (retry === maxRetries) {
                    console.log("Erro ao criar log.");
                }
                retry++;
            }
        }
    }
}
exports.DatabaseLog = DatabaseLog;
