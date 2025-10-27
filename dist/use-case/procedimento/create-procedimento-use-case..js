"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProcedimentoUseCase = void 0;
const prisma_procedimento_repository_1 = require("../../db/prisma/respositories/prisma-procedimento-repository");
const create_log_1 = require("../logs/create-log");
class CreateProcedimentoUseCase {
    async execute(procedimento) {
        const responseCreate = await new prisma_procedimento_repository_1.PrismaProcedimentoRepository().create(procedimento);
        if (!responseCreate.status) {
            await new create_log_1.CreateLog().execute(responseCreate);
        }
        return responseCreate;
    }
}
exports.CreateProcedimentoUseCase = CreateProcedimentoUseCase;
