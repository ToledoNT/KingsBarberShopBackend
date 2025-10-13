import type { Request, Response } from "express";
import { IUpdateAppointment } from "../../interface/agendamentos/update-agendamento-interface";
import { UpdateAppointmentUseCase } from "../../use-case/agendamento/update-agendamento-use-case";

export class UpdateAppointmentController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id, nome, telefone, email, data, hora, servico, profissional, status } = req.body;

    if (!id) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "O campo 'id' é obrigatório para atualização.",
        data: []
      });
      return;
    }

    const payload: IUpdateAppointment = {
      id,
      nome,
      telefone,
      email,
      data,
      hora,
      servico,
      profissional,
      status
    };

    const updatedAppointmentResult = await new UpdateAppointmentUseCase().execute(payload);

    res.status(updatedAppointmentResult.code).json(updatedAppointmentResult);
  }
}