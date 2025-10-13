import type { Request, Response } from "express";
import { DeleteProfissionalUseCase } from "../../use-case/profissional/delete-profissional-usse-case";
export class DeleteProfessionalController {
  async handle(req: Request, res: Response): Promise<void> {
    const profissionalId = req.params.id; // pega da URL
    if (!profissionalId) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O campo 'id' é obrigatório para deletar o profissional.",
        data: []
      });
      return;
    }

    const useCase = new DeleteProfissionalUseCase();
    const deleteResult = await useCase.execute(profissionalId);
    console.log(deleteResult)

    res.status(deleteResult.code).json(deleteResult);
  }
}