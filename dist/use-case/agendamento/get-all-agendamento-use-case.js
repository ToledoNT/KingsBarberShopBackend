"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllAppointmentsUseCase = void 0;
const prisma_agendamento_repository_1 = require("../../db/prisma/respositories/prisma-agendamento-repository");
const create_log_1 = require("../logs/create-log");
class GetAllAppointmentsUseCase {
    async execute() {
        const response = await new prisma_agendamento_repository_1.PrismaAppointmentRepository().getAll();
        if (!response.status) {
            await new create_log_1.CreateLog().execute(response);
        }
        return response;
    }
}
exports.GetAllAppointmentsUseCase = GetAllAppointmentsUseCase;
