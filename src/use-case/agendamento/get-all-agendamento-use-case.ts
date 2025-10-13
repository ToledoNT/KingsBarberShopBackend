import { PrismaAppointmentRepository } from "../../db/prisma/respositories/prisma-agendamento-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class GetAllAppointmentsUseCase {
  async execute(): Promise<ResponseTemplateInterface> {
    const response = await new PrismaAppointmentRepository().getAll();

    if (!response.status) {
      await new CreateLog().execute(response);
    }

    return response;
  }
}