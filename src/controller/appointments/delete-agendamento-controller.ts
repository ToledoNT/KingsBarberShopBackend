import type { Request, Response } from "express";
import { DeleteAppointmentUseCase } from "../../use-case/agendamento/delete-agendamento-use-case";

export class DeleteAppointmentController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O parâmetro 'id' é obrigatório para deletar o agendamento.",
        data: []
      });
      return;
    }

    const result = await new DeleteAppointmentUseCase().execute(id);
    res.status(result.code).json(result);
  }
}