"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHorarioByIdUseCase = void 0;
const prisma_horario_repository_1 = require("../../db/prisma/respositories/prisma-horario-repository");
const create_log_1 = require("../logs/create-log");
class GetHorarioByIdUseCase {
    async execute(id) {
        const horario = await new prisma_horario_repository_1.PrismaHorarioRepository().findById(id);
        if (!horario) {
            const response = {
                status: false,
                code: 404,
                message: "Horário não encontrado",
                data: null,
            };
            await new create_log_1.CreateLog().execute(response);
            return response;
        }
        const response = {
            status: true,
            code: 200,
            message: "Horário encontrado",
            data: horario,
        };
        return response;
    }
}
exports.GetHorarioByIdUseCase = GetHorarioByIdUseCase;
