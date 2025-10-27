"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFinanceiroUseCase = void 0;
const prisma_financeiro_repository_1 = require("../../db/prisma/respositories/prisma-financeiro-repository");
const create_log_1 = require("../logs/create-log");
class CreateFinanceiroUseCase {
    async execute(data) {
        console.log("Criando lançamento financeiro...");
        const repository = new prisma_financeiro_repository_1.PrismaFinanceiroRepository();
        const response = await repository.create(data);
        if (response.status) {
            return response.data;
        }
        else {
            console.error("Erro ao criar lançamento financeiro:", response.error);
            await new create_log_1.CreateLog().execute(response);
            return null;
        }
    }
}
exports.CreateFinanceiroUseCase = CreateFinanceiroUseCase;
