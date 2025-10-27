"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProcedimentoUseCase = void 0;
const prisma_procedimento_repository_1 = require("../../db/prisma/respositories/prisma-procedimento-repository");
const create_log_1 = require("../logs/create-log");
class UpdateProcedimentoUseCase {
    async execute(id, procedimento) {
        const responseUpdate = await new prisma_procedimento_repository_1.PrismaProcedimentoRepository().update(id, procedimento);
        if (!responseUpdate.status) {
            await new create_log_1.CreateLog().execute(responseUpdate);
        }
        return responseUpdate;
    }
}
exports.UpdateProcedimentoUseCase = UpdateProcedimentoUseCase;
