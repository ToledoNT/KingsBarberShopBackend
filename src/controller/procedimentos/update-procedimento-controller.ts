import type { Request, Response } from "express";
import { IUpdateProcedimento } from "../../interface/procedimento/update-procedimento-interface";
import { UpdateProcedimentoUseCase } from "../../use-case/procedimento/update-procedimento-use-case";
import { UpdateProcedimentoModel } from "../../model/procedimento/update-procedimento-use-case";
export class UpdateProcedimentoController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { nome, valor, profissionalId } = req.body;

    if (!id || !nome || valor === undefined) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "ID, nome e preço são obrigatórios.",
        data: []
      });
      return;
    }

    const updateModel = new UpdateProcedimentoModel({ id, nome, valor, profissionalId });

    const payload: IUpdateProcedimento = updateModel.toPayload();

    const updatedResult = await new UpdateProcedimentoUseCase().execute(id, payload);

    res.status(updatedResult.code).json(updatedResult);
  }
}