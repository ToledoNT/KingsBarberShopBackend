import { PrismaAppointmentRepository } from "db/prisma/respositories/prisma-agendamento-repository";
import { ResponseTemplateInterface } from "interface/response-template-interface";

export class GetAllAppointmentsUseCase {
  async execute(): Promise<ResponseTemplateInterface> {
    const repository = new PrismaAppointmentRepository();
    const response = await repository.getAll();
    return response;
  }
}