"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHorariosByBarbeiroUseCase = void 0;
const prisma_horario_repository_1 = require("../../db/prisma/respositories/prisma-horario-repository");
const create_log_1 = require("../logs/create-log");
class GetHorariosByBarbeiroUseCase {
    async execute(barbeiroId) {
        const response = await new prisma_horario_repository_1.PrismaHorarioRepository().getByBarbeiro(barbeiroId);
        if (!response.status) {
            await new create_log_1.CreateLog().execute(response);
        }
        return response;
    }
}
exports.GetHorariosByBarbeiroUseCase = GetHorariosByBarbeiroUseCase;
