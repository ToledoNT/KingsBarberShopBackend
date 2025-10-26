"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllAppointmentsController = void 0;
const get_all_agendamento_use_case_1 = require("../../use-case/agendamento/get-all-agendamento-use-case");
const getAllAppointmentsUseCase = new get_all_agendamento_use_case_1.GetAllAppointmentsUseCase();
class GetAllAppointmentsController {
    async handle(req, res) {
        const appointments = await getAllAppointmentsUseCase.execute();
        res.status(appointments.code).json(appointments);
    }
}
exports.GetAllAppointmentsController = GetAllAppointmentsController;
