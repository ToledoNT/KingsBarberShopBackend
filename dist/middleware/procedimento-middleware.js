"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcedimentoMiddleware = void 0;
class ProcedimentoMiddleware {
    handleCreateProcedimento(req, res, next) {
        const { nome, valor, profissionalId } = req.body;
        if (!nome || typeof valor !== "number" || valor < 0 || !profissionalId) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "Nome, preço válido e profissionalId são obrigatórios para criar um procedimento.",
                data: null,
            });
            return;
        }
        next();
    }
    handleUpdateProcedimento(req, res, next) {
        const { id } = req.params;
        const { nome, valor, profissionalId } = req.body;
        if (!id || typeof id !== "string" || id.trim() === "") {
            res.status(400).json({
                status: false,
                code: 400,
                message: "ID é obrigatório e deve ser uma string válida.",
                data: [],
            });
            return;
        }
        if (!nome || typeof nome !== "string" || nome.trim() === "") {
            res.status(400).json({
                status: false,
                code: 400,
                message: "Nome é obrigatório e não pode ser vazio.",
                data: [],
            });
            return;
        }
        const precoNumero = Number(valor);
        if (isNaN(precoNumero) || precoNumero < 0) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "Preço é obrigatório e deve ser um número maior ou igual a 0.",
                data: [],
            });
            return;
        }
        if (!profissionalId || typeof profissionalId !== "string" || profissionalId.trim() === "") {
            res.status(400).json({
                status: false,
                code: 400,
                message: "profissionalId é obrigatório e deve ser uma string válida.",
                data: [],
            });
            return;
        }
        req.body.preco = precoNumero;
        next();
    }
    handleDeleteProcedimento(req, res, next) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "ID é obrigatório para remover um procedimento.",
                data: [],
            });
            return;
        }
        next();
    }
}
exports.ProcedimentoMiddleware = ProcedimentoMiddleware;
