"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllFinanceiroUseCase = void 0;
const prisma_financeiro_repository_1 = require("../../db/prisma/respositories/prisma-financeiro-repository");
const create_log_1 = require("../logs/create-log");
class GetAllFinanceiroUseCase {
    async execute() {
        const responseGetAll = await new prisma_financeiro_repository_1.PrismaFinanceiroRepository().getAll();
        if (!responseGetAll.status) {
            await new create_log_1.CreateLog().execute(responseGetAll);
        }
        return responseGetAll;
    }
}
exports.GetAllFinanceiroUseCase = GetAllFinanceiroUseCase;
