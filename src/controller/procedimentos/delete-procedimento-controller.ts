import type { Request, Response } from "express";
import { DeleteProcedimentoUseCase } from "../../use-case/procedimento/delete-procedimento-use-case";

export class DeleteProcedimentoController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "ID é obrigatório.",
        data: []
      });
      return;
    }

    const deletedProcedimentoResult = await new DeleteProcedimentoUseCase().execute(id);

    res.status(deletedProcedimentoResult.code).json(deletedProcedimentoResult);
  }
}