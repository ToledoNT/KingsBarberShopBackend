"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorarioMiddleware = void 0;
class HorarioMiddleware {
    handleCreateHorario(req, res, next) {
        const { profissional, data } = req.body;
        console.log(req.body);
        if (!profissional ||
            typeof profissional !== "object" ||
            !profissional.id ||
            typeof profissional.id !== "string" ||
            profissional.id.trim() === "") {
            res.status(400).json({
                status: false,
                code: 400,
                message: "O campo 'profissional.id' é obrigatório e deve ser uma string válida.",
                data: null,
            });
            return;
        }
        if (!data || isNaN(Date.parse(data))) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "O campo 'data' é obrigatório e deve ser uma data válida (YYYY-MM-DD).",
                data: null,
            });
            return;
        }
        req.body.data = new Date(data).toISOString().split("T")[0];
        next();
    }
    handleUpdateHorario(req, res, next) {
        const { id } = req.params;
        if (!id || typeof id !== "string" || id.trim() === "") {
            res.status(400).json({
                status: false,
                code: 400,
                message: "O ID é obrigatório e deve ser uma string válida.",
                data: null,
            });
            return;
        }
        if ("disponivel" in req.body) {
            req.body.disponivel = !!req.body.disponivel;
        }
        next();
    }
    handleDeleteHorario(req, res, next) {
        const { id } = req.params;
        if (!id || typeof id !== "string" || id.trim() === "") {
            res.status(400).json({
                status: false,
                code: 400,
                message: "O ID é obrigatório para remover o horário.",
                data: null,
            });
            return;
        }
        next();
    }
}
exports.HorarioMiddleware = HorarioMiddleware;
