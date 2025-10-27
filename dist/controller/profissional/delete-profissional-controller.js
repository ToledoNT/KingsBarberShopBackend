"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProfessionalController = void 0;
const delete_profissional_usse_case_1 = require("../../use-case/profissional/delete-profissional-usse-case");
class DeleteProfessionalController {
    async handle(req, res) {
        const profissionalId = req.params.id;
        if (!profissionalId) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "O campo 'id' é obrigatório para deletar o profissional.",
                data: []
            });
            return;
        }
        const useCase = new delete_profissional_usse_case_1.DeleteProfissionalUseCase();
        const deleteResult = await useCase.execute(profissionalId);
        res.status(deleteResult.code).json(deleteResult);
    }
}
exports.DeleteProfessionalController = DeleteProfessionalController;
