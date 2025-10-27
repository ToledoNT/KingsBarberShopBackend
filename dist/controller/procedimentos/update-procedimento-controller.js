"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProcedimentoController = void 0;
const update_procedimento_use_case_1 = require("../../use-case/procedimento/update-procedimento-use-case");
const update_procedimento_use_case_2 = require("../../model/procedimento/update-procedimento-use-case");
class UpdateProcedimentoController {
    async handle(req, res) {
        const { id } = req.params;
        const { nome, valor, profissionalId } = req.body;
        if (!id || !nome || valor === undefined) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "ID, nome e preço são obrigatórios.",
                data: []
            });
            return;
        }
        const updateModel = new update_procedimento_use_case_2.UpdateProcedimentoModel({ id, nome, valor, profissionalId });
        const payload = updateModel.toPayload();
        const updatedResult = await new update_procedimento_use_case_1.UpdateProcedimentoUseCase().execute(id, payload);
        res.status(updatedResult.code).json(updatedResult);
    }
}
exports.UpdateProcedimentoController = UpdateProcedimentoController;
