"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalMiddleware = void 0;
class ProfessionalMiddleware {
    handleCreateProfessional(req, res, next) {
        const { nome, email, telefone } = req.body;
        if (!nome || !email || !telefone) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "Os campos 'nome', 'email' e 'telefone' são obrigatórios.",
                data: []
            });
            return;
        }
        next();
    }
    handleUpdateProfessional(req, res, next) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "O campo 'id' é obrigatório para atualização.",
                data: []
            });
            return;
        }
        next();
    }
    handleDeleteProfessional(req, res, next) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "O campo 'id' é obrigatório para deleção.",
                data: []
            });
            return;
        }
        next();
    }
}
exports.ProfessionalMiddleware = ProfessionalMiddleware;
