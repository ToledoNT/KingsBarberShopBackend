"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteHorarioController = void 0;
const delete_horario_use_case_1 = require("../../use-case/horario/delete-horario-use-case");
class DeleteHorarioController {
    async handle(req, res) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "O parâmetro 'id' é obrigatório para deletar o horário.",
                data: [],
            });
            return;
        }
        const result = await new delete_horario_use_case_1.DeleteHorarioUseCase().execute(id);
        res.status(result.code).json(result);
    }
}
exports.DeleteHorarioController = DeleteHorarioController;
