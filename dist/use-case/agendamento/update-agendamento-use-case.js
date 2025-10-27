"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppointmentUseCase = void 0;
const prisma_agendamento_repository_1 = require("../../db/prisma/respositories/prisma-agendamento-repository");
const create_log_1 = require("../logs/create-log");
class UpdateAppointmentUseCase {
    async execute(data) {
        const responseUpdate = await new prisma_agendamento_repository_1.PrismaAppointmentRepository().update(data);
        if (!responseUpdate.status) {
            await new create_log_1.CreateLog().execute(responseUpdate);
        }
        return responseUpdate;
    }
}
exports.UpdateAppointmentUseCase = UpdateAppointmentUseCase;
