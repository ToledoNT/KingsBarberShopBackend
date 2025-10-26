"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentUseCase = void 0;
const prisma_agendamento_repository_1 = require("../../db/prisma/respositories/prisma-agendamento-repository");
const create_log_1 = require("../logs/create-log");
class CreateAppointmentUseCase {
    async execute(appointment) {
        const responseCreate = await new prisma_agendamento_repository_1.PrismaAppointmentRepository().create(appointment);
        if (!responseCreate.status) {
            await new create_log_1.CreateLog().execute(responseCreate);
        }
        return responseCreate;
    }
}
exports.CreateAppointmentUseCase = CreateAppointmentUseCase;
