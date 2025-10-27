import type { Request, Response, NextFunction } from "express";

export class AppointmentMiddleware {
handleCreateAppointment(req: Request, res: Response, next: NextFunction): void {
    const { nome, telefone, email, barbeiro, data, hora, servico, status, inicio , fim  } = req.body;

    if (
      !nome ||
      !telefone ||
      !email ||
      !data ||
      !hora ||
      !servico ||
      !barbeiro ||
      !inicio ||
      !fim ||

      !status
    ) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "Todos os campos obrigatórios devem ser preenchidos.",
        data: [],
      });
      return;
    }

    // Chama o próximo middleware ou controller
    next();
  }

  handleUpdateAppointment(req: Request, res: Response, next: NextFunction): void {
    const { id, nome, telefone, email, data, inicio, fim, servicoId, profissionalId, status } = req.body;

    if (!id) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O campo 'id' é obrigatório para atualização.",
        data: [],
      });
      return;
    }

    if (!nome && !telefone && !email && !data && !inicio && !fim && !servicoId && !profissionalId && !status) {
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

  handleDeleteAppointment(req: Request, res: Response, next: NextFunction): void {
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