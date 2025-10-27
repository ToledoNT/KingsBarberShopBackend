"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProcedimentosUseCase = void 0;
const prisma_procedimento_repository_1 = require("../../db/prisma/respositories/prisma-procedimento-repository");
const create_log_1 = require("../logs/create-log");
class GetAllProcedimentosUseCase {
    async execute() {
        const responseGetAll = await new prisma_procedimento_repository_1.PrismaProcedimentoRepository().getAll();
        if (!responseGetAll.status) {
            await new create_log_1.CreateLog().execute(responseGetAll);
        }
        return responseGetAll;
    }
}
exports.GetAllProcedimentosUseCase = GetAllProcedimentosUseCase;
