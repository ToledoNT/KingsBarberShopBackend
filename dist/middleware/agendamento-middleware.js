"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentMiddleware = void 0;
class AppointmentMiddleware {
    handleCreateAppointment(req, res, next) {
        const { nome, telefone, email, data, hora, servico, barbeiro } = req.body;
        if (!nome || !telefone || !email || !data || !hora || !servico || !barbeiro) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "Todos os campos são obrigatórios.",
                data: [],
            });
            return;
        }
        next();
    }
    handleUpdateAppointment(req, res, next) {
        const { id, nome, telefone, email, data, hora, servico, barbeiro, status } = req.body;
        if (!id) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "O campo 'id' é obrigatório para atualização.",
                data: [],
            });
            return;
        }
        if (!nome && !telefone && !email && !data && !hora && !servico && !barbeiro && !status) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "Nenhum campo fornecido para atualização.",
                data: [],
            });
            return;
        }
        next();
    }
    handleDeleteAppointment(req, res, next) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "O campo 'id' é obrigatório para deleção.",
                data: [],
            });
            return;
        }
        next();
    }
}
exports.AppointmentMiddleware = AppointmentMiddleware;
