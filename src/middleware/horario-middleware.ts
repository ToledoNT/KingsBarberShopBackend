import type { Request, Response, NextFunction } from "express";

export class HorarioMiddleware {
  handleCreateHorario(req: Request, res: Response, next: NextFunction): void {
    const { profissional, data } = req.body;
    console.log(req.body);

    // Validação do objeto profissional
    if (
      !profissional ||
      typeof profissional !== "object" ||
      !profissional.id ||
      typeof profissional.id !== "string" ||
      profissional.id.trim() === ""
    ) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O campo 'profissional.id' é obrigatório e deve ser uma string válida.",
        data: null,
      });
      return;
    }

    // Validação da data
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


  handleUpdateHorario(req: Request, res: Response, next: NextFunction): void {
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

  handleDeleteHorario(req: Request, res: Response, next: NextFunction): void {
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