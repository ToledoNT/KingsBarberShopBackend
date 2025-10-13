import type { Request, Response, NextFunction } from "express";

export class ProfessionalMiddleware {
  handleCreateProfessional(req: Request, res: Response, next: NextFunction): void {
    const { nome, email, telefone } = req.body;
    console.log(nome, email , telefone)

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

  handleUpdateProfessional(req: Request, res: Response, next: NextFunction): void {
    const { id } = req.body;

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

  handleDeleteProfessional(req: Request, res: Response, next: NextFunction): void {
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