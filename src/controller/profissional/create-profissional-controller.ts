import type { Request, Response } from "express";
import { ICreateProfessional } from "../../interface/profissional/create-profissional";
import { CreateProfessionalModel } from "../../model/profissional/create-profissional-model";
import { CreateProfissionalUseCase } from "../../use-case/profissional/create-profissional-use-case";

export class CreateProfessionalController {
  async handle(req: Request, res: Response): Promise<void> {
    const { nome, email, telefone, procedimentos } = req.body;

    if (!nome || !email || !telefone) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "Os campos 'nome', 'email' e 'telefone' são obrigatórios.",
        data: []
      });
      return;
    }

    const payload: ICreateProfessional = new CreateProfessionalModel({
      nome,
      email,
      telefone,
      procedimentos
    }).toPayload();

    const useCase = new CreateProfissionalUseCase();
    const createdProfessionalResult = await useCase.execute(payload);

    if (createdProfessionalResult.status && createdProfessionalResult.data) {
      const { id, nome, email, telefone, criadoEm, atualizadoEm } = createdProfessionalResult.data;
      createdProfessionalResult.data = {
        id,
        name: nome, 
        email,
        telefone,
        createdAt: criadoEm,   
        updatedAt: atualizadoEm,
      };
    }

    res.status(createdProfessionalResult.code).json(createdProfessionalResult);
  }
}