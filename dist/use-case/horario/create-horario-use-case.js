"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHorarioUseCase = void 0;
const prisma_horario_repository_1 = require("../../db/prisma/respositories/prisma-horario-repository");
const create_log_1 = require("../logs/create-log");
class CreateHorarioUseCase {
    async execute(horario) {
        const responseCreate = await new prisma_horario_repository_1.PrismaHorarioRepository().create(horario);
        if (!responseCreate.status) {
            await new create_log_1.CreateLog().execute(responseCreate);
        }
        return responseCreate;
    }
}
exports.CreateHorarioUseCase = CreateHorarioUseCase;
