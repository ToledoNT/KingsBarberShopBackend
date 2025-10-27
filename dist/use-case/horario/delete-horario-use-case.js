"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteHorarioUseCase = void 0;
const prisma_horario_repository_1 = require("../../db/prisma/respositories/prisma-horario-repository");
const create_log_1 = require("../logs/create-log");
class DeleteHorarioUseCase {
    async execute(id) {
        const responseDelete = await new prisma_horario_repository_1.PrismaHorarioRepository().delete(id);
        if (!responseDelete.status) {
            await new create_log_1.CreateLog().execute(responseDelete);
        }
        return responseDelete;
    }
}
exports.DeleteHorarioUseCase = DeleteHorarioUseCase;
