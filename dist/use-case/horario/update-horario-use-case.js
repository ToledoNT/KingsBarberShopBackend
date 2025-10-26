"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHorarioUseCase = void 0;
const prisma_horario_repository_1 = require("../../db/prisma/respositories/prisma-horario-repository");
const create_log_1 = require("../logs/create-log");
class UpdateHorarioUseCase {
    async execute(id, horario) {
        const responseUpdate = await new prisma_horario_repository_1.PrismaHorarioRepository().update(id, horario);
        if (!responseUpdate.status) {
            await new create_log_1.CreateLog().execute(responseUpdate);
        }
        return responseUpdate;
    }
}
exports.UpdateHorarioUseCase = UpdateHorarioUseCase;
