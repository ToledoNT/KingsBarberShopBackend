import type { Request, Response } from "express";
import { IUpdateProfessional } from "../../interface/profissional/update-profissional-interface";
import { UpdateProfissionalUseCase } from "../../use-case/profissional/update-profissional-use-case";

export class UpdateProfessionalController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id, nome, email, telefone, procedimentos } = req.body;

    if (!id) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O campo 'id' é obrigatório para atualização.",
        data: []
      });
      return;
    }

    const payload: IUpdateProfessional = {
      id,
      nome,
      email,
      telefone,
      procedimentos
    };

    const updateUseCase = new UpdateProfissionalUseCase();
    const updatedProfessionalResult = await updateUseCase.execute(payload);
    console.log(updatedProfessionalResult)

    res.status(updatedProfessionalResult.code).json(updatedProfessionalResult);
  }
}