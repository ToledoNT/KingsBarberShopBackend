"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAppointmentUseCase = void 0;
const prisma_agendamento_repository_1 = require("../../db/prisma/respositories/prisma-agendamento-repository");
const create_log_1 = require("../logs/create-log");
class DeleteAppointmentUseCase {
    async execute(id) {
        const responseDelete = await new prisma_agendamento_repository_1.PrismaAppointmentRepository().deleteById(id);
        if (!responseDelete.status) {
            await new create_log_1.CreateLog().execute(responseDelete);
        }
        return responseDelete;
    }
}
exports.DeleteAppointmentUseCase = DeleteAppointmentUseCase;
