import type { Request, Response } from "express";
import { UpdateHorarioUseCase } from "../../use-case/horario/update-horario-use-case";
import { IUpdateHorario } from "../../interface/horario/update-horario";

export class UpdateHorarioController {
  async handle(req: Request, res: Response): Promise<void> {
    const { profissionalId, data, inicio, fim, disponivel } = req.body;
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O campo 'id' é obrigatório para atualização do horário.",
        data: [],
      });
      return;
    }

    const payload: IUpdateHorario = {
      id,
      ...(profissionalId && { profissionalId }),
      ...(data && { data: new Date(data) }),
      ...(inicio && { inicio }),
      ...(fim && { fim }),
      ...(disponivel !== undefined && { disponivel: !!disponivel }),
    };

    const updatedHorarioResult = await new UpdateHorarioUseCase().execute(id, payload);
    res.status(updatedHorarioResult.code).json(updatedHorarioResult);
  }
}