"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProcedimentosByProfissionalUseCase = void 0;
const prisma_procedimento_repository_1 = require("../../db/prisma/respositories/prisma-procedimento-repository");
const create_log_1 = require("../logs/create-log");
class GetProcedimentosByProfissionalUseCase {
    async execute(id) {
        const responseGet = await new prisma_procedimento_repository_1.PrismaProcedimentoRepository().findByProfissionalId(id);
        if (!responseGet.status) {
            await new create_log_1.CreateLog().execute(responseGet);
        }
        return responseGet;
    }
}
exports.GetProcedimentosByProfissionalUseCase = GetProcedimentosByProfissionalUseCase;
