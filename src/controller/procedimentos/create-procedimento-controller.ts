import type { Request, Response } from "express";
import { ICreateProcedimento } from "../../interface/procedimento/create-procedimento-interface";
import { CreateProcedimentoUseCase } from "../../use-case/procedimento/create-procedimento-use-case.";

export class CreateProcedimentoController {
  async handle(req: Request, res: Response): Promise<void> {
    const { nome, valor, profissionalId } = req.body;

    if (!nome || valor === undefined) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "Nome e preço são obrigatórios.",
        data: []
      });
      return;
    }

    const payload: ICreateProcedimento = { nome, valor, profissionalId };

    const createdProcedimentoResult = await new CreateProcedimentoUseCase().execute(payload);
    console.log(createdProcedimentoResult)

    res.status(createdProcedimentoResult.code).json(createdProcedimentoResult);
  }
}