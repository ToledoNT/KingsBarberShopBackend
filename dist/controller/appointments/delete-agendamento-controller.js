"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAppointmentController = void 0;
const delete_agendamento_use_case_1 = require("../../use-case/agendamento/delete-agendamento-use-case");
class DeleteAppointmentController {
    async handle(req, res) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "O parâmetro 'id' é obrigatório para deletar o agendamento.",
                data: []
            });
            return;
        }
        const result = await new delete_agendamento_use_case_1.DeleteAppointmentUseCase().execute(id);
        res.status(result.code).json(result);
    }
}
exports.DeleteAppointmentController = DeleteAppointmentController;
