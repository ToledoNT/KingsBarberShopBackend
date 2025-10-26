"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProfessionalController = void 0;
const create_profissional_model_1 = require("../../model/profissional/create-profissional-model");
const create_profissional_use_case_1 = require("../../use-case/profissional/create-profissional-use-case");
class CreateProfessionalController {
    async handle(req, res) {
        const { nome, email, telefone, procedimentos } = req.body;
        if (!nome || !email || !telefone) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "Os campos 'nome', 'email' e 'telefone' são obrigatórios.",
                data: []
            });
            return;
        }
        const payload = new create_profissional_model_1.CreateProfessionalModel({
            nome,
            email,
            telefone,
            procedimentos
        }).toPayload();
        const useCase = new create_profissional_use_case_1.CreateProfissionalUseCase();
        const createdProfessionalResult = await useCase.execute(payload);
        if (createdProfessionalResult.status && createdProfessionalResult.data) {
            const { id, nome, email, telefone, criadoEm, atualizadoEm } = createdProfessionalResult.data;
            createdProfessionalResult.data = {
                id,
                name: nome,
                email,
                telefone,
                createdAt: criadoEm,
                updatedAt: atualizadoEm,
            };
        }
        res.status(createdProfessionalResult.code).json(createdProfessionalResult);
    }
}
exports.CreateProfessionalController = CreateProfessionalController;
