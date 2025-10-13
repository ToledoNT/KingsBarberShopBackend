import { PrismaAppointmentRepository } from "db/prisma/respositories/prisma-agendamento-repository";
import { ResponseTemplateInterface } from "interface/response-template-interface";

export class DeleteAppointmentUseCase {
  async execute(id: string): Promise<ResponseTemplateInterface> {
    const repository = new PrismaAppointmentRepository();
    const response = await repository.deleteById(id);
    return response;
  }
}