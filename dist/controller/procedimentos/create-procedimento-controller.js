"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProcedimentoController = void 0;
const create_procedimento_use_case_1 = require("../../use-case/procedimento/create-procedimento-use-case.");
class CreateProcedimentoController {
    async handle(req, res) {
        const { nome, valor, profissionalId } = req.body;
        if (!nome || valor === undefined) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "Nome e preço são obrigatórios.",
                data: []
            });
            return;
        }
        const payload = { nome, valor, profissionalId };
        const createdProcedimentoResult = await new create_procedimento_use_case_1.CreateProcedimentoUseCase().execute(payload);
        res.status(createdProcedimentoResult.code).json(createdProcedimentoResult);
    }
}
exports.CreateProcedimentoController = CreateProcedimentoController;
