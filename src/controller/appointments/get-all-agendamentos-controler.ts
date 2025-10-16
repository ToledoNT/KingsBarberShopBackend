import type { Request, Response } from "express";
import { GetAllAppointmentsUseCase } from "../../use-case/agendamento/get-all-agendamento-use-case";

const getAllAppointmentsUseCase = new GetAllAppointmentsUseCase();

export class GetAllAppointmentsController {
  async handle(req: Request, res: Response): Promise<void> {
    const appointments = await getAllAppointmentsUseCase.execute();
    res.status(appointments.code).json(appointments);
  }
}