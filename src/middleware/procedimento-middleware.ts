import type { Request, Response, NextFunction } from "express";

export class ProcedimentoMiddleware {
  // ✅ Middleware para criar procedimento
  handleCreateProcedimento(req: Request, res: Response, next: NextFunction): void {
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

  handleUpdateProcedimento(req: Request, res: Response, next: NextFunction): void {
    const { id } = req.params;
    const { nome, preco, profissionalId } = req.body;

    if (!id || !nome || preco === undefined || !profissionalId) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "ID, nome, preço e profissionalId são obrigatórios para atualizar um procedimento.",
        data: [],
      });
      return;
    }

    next();
  }

  handleDeleteProcedimento(req: Request, res: Response, next: NextFunction): void {
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