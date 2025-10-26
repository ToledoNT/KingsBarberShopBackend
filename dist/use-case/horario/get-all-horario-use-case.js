"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllHorariosUseCase = void 0;
const prisma_horario_repository_1 = require("../../db/prisma/respositories/prisma-horario-repository");
const create_log_1 = require("../logs/create-log");
class GetAllHorariosUseCase {
    async execute() {
        const response = await new prisma_horario_repository_1.PrismaHorarioRepository().getAll();
        if (!response.status) {
            await new create_log_1.CreateLog().execute(response);
        }
        return response;
    }
}
exports.GetAllHorariosUseCase = GetAllHorariosUseCase;
