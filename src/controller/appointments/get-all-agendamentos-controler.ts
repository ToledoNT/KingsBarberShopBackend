import type { Request, Response } from "express";
import { GetAllAppointmentsUseCase } from "../../use-case/agendamento/get-all-agendamento-use-case";

export class GetAllAppointmentsController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const appointments = await new GetAllAppointmentsUseCase().execute();

      res.status(appointments.code).json(appointments);
    } catch (error: any) {
      console.error("Erro ao recuperar agendamentos:", error);
      res.status(500).json({
        status: false,
        code: 500,
        message: "Erro interno ao recuperar agendamentos",
        data: []
      });
    }
  }
}