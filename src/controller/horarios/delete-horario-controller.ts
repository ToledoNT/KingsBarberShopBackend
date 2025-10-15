import type { Request, Response } from "express";
import { DeleteHorarioUseCase } from "../../use-case/horario/delete-horario-use-case";

export class DeleteHorarioController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O parâmetro 'id' é obrigatório para deletar o horário.",
        data: [],
      });
      return;
    }

    const result = await new DeleteHorarioUseCase().execute(id);
    res.status(result.code).json(result);
  }
}