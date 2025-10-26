"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProcedimentoController = void 0;
const delete_procedimento_use_case_1 = require("../../use-case/procedimento/delete-procedimento-use-case");
class DeleteProcedimentoController {
    async handle(req, res) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "ID é obrigatório.",
                data: []
            });
            return;
        }
        const deletedProcedimentoResult = await new delete_procedimento_use_case_1.DeleteProcedimentoUseCase().execute(id);
        res.status(deletedProcedimentoResult.code).json(deletedProcedimentoResult);
    }
}
exports.DeleteProcedimentoController = DeleteProcedimentoController;
