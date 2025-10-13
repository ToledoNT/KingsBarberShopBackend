import type { Request, Response } from "express";
import { ICreateAppointment } from "interface/agendamentos/create-agendamento-interface";
import { CreateAppointmentUseCase } from "use-case/agendamento/create-agendamento-use-case";

export class CreateAppointmentController {
  async handle(req: Request, res: Response): Promise<void> {
    const { nome, telefone, email, data, hora, servico, profissional } = req.body;

    if (!nome || !telefone || !email || !data || !hora || !servico || !profissional) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "Todos os campos são obrigatórios.",
        data: []
      });
      return;
    }

    const payload: ICreateAppointment = { nome, telefone, email, data, hora, servico, profissional };

    const createdAppointmentResult = await new CreateAppointmentUseCase().execute(payload);

    res.status(createdAppointmentResult.code).json(createdAppointmentResult);
  }
}