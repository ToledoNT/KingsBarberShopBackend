"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHorarioController = void 0;
const update_horario_use_case_1 = require("../../use-case/horario/update-horario-use-case");
class UpdateHorarioController {
    async handle(req, res) {
        const { profissionalId, data, inicio, fim, disponivel } = req.body;
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "O campo 'id' é obrigatório para atualização do horário.",
                data: [],
            });
            return;
        }
        const payload = {
            id,
            ...(profissionalId && { profissionalId }),
            ...(data && { data: new Date(data) }),
            ...(inicio && { inicio }),
            ...(fim && { fim }),
            ...(disponivel !== undefined && { disponivel: !!disponivel }),
        };
        const updatedHorarioResult = await new update_horario_use_case_1.UpdateHorarioUseCase().execute(id, payload);
        res.status(updatedHorarioResult.code).json(updatedHorarioResult);
    }
}
exports.UpdateHorarioController = UpdateHorarioController;
