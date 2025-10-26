"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfessionalController = void 0;
const update_profissional_use_case_1 = require("../../use-case/profissional/update-profissional-use-case");
class UpdateProfessionalController {
    async handle(req, res) {
        const { nome, email, telefone, procedimentos } = req.body;
        const id = req.params.id;
        if (!id) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "O campo 'id' é obrigatório para atualização.",
                data: []
            });
            return;
        }
        const payload = {
            id,
            nome,
            email,
            telefone,
            procedimentos
        };
        const updateUseCase = new update_profissional_use_case_1.UpdateProfissionalUseCase();
        const updatedProfessionalResult = await updateUseCase.execute(payload);
        res.status(updatedProfessionalResult.code).json(updatedProfessionalResult);
    }
}
exports.UpdateProfessionalController = UpdateProfessionalController;
