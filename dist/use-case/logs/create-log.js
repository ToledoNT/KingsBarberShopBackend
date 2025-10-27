"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLog = void 0;
const prisma_logs_repository_1 = require("../../db/prisma/respositories/prisma-logs-repository");
class CreateLog {
    async execute(value) {
        await new prisma_logs_repository_1.DatabaseLog().create(value);
        return;
    }
}
exports.CreateLog = CreateLog;
