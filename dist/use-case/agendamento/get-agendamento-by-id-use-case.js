"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAppointmentByIdUseCase = void 0;
const prisma_agendamento_repository_1 = require("../../db/prisma/respositories/prisma-agendamento-repository");
const create_log_1 = require("../logs/create-log");
class GetAppointmentByIdUseCase {
    async execute(id) {
        const response = await new prisma_agendamento_repository_1.PrismaAppointmentRepository().findById(id);
        if (!response) {
            const errorResponse = {
                status: false,
                code: 404,
                message: `Agendamento com id ${id} não encontrado.`,
                data: [],
            };
            await new create_log_1.CreateLog().execute(errorResponse);
            return errorResponse;
        }
        return {
            status: true,
            code: 200,
            message: "Agendamento encontrado com sucesso.",
            data: response,
        };
    }
}
exports.GetAppointmentByIdUseCase = GetAppointmentByIdUseCase;
