"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProcedimentoUseCase = void 0;
const prisma_procedimento_repository_1 = require("../../db/prisma/respositories/prisma-procedimento-repository");
const create_log_1 = require("../logs/create-log");
class DeleteProcedimentoUseCase {
    async execute(id) {
        const responseDelete = await new prisma_procedimento_repository_1.PrismaProcedimentoRepository().delete(id);
        if (!responseDelete.status) {
            await new create_log_1.CreateLog().execute(responseDelete);
        }
        return responseDelete;
    }
}
exports.DeleteProcedimentoUseCase = DeleteProcedimentoUseCase;
