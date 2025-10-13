import type { Request, Response, NextFunction } from "express";

export class AppointmentMiddleware {
  handleCreateAppointment(req: Request, res: Response, next: NextFunction): void {
    const { nome, telefone, email, data, hora, servico, profissional } = req.body;

    if (!nome || !telefone || !email || !data || !hora || !servico || !profissional) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "Todos os campos são obrigatórios.",
        data: []
      });
      return;
    }

    next();
  }

  handleUpdateAppointment(req: Request, res: Response, next: NextFunction): void {
    const { id, nome, telefone, email, data, hora, servico, profissional, status } = req.body;

    if (!id) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O campo 'id' é obrigatório para atualização.",
        data: []
      });
      return;
    }

    if (!nome && !telefone && !email && !data && !hora && !servico && !profissional && !status) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "Nenhum campo fornecido para atualização.",
        data: []
      });
      return;
    }

    next();
  }

  handleDeleteAppointment(req: Request, res: Response, next: NextFunction): void {
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