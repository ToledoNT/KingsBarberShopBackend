"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllRelatorioUseCase = void 0;
const prisma_relatorio_repositorio_1 = require("../../db/prisma/respositories/prisma-relatorio-repositorio");
const create_log_1 = require("../logs/create-log");
class GetAllRelatorioUseCase {
    async execute() {
        const response = await new prisma_relatorio_repositorio_1.PrismaRelatorioRepository().getAll();
        if (!response.status) {
            await new create_log_1.CreateLog().execute(response);
        }
        return response;
    }
}
exports.GetAllRelatorioUseCase = GetAllRelatorioUseCase;
