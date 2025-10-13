import { PrismaAppointmentRepository } from "../../db/prisma/respositories/prisma-agendamento-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class DeleteAppointmentUseCase {
  async execute(id: string): Promise<ResponseTemplateInterface> {
    const responseDelete = await new PrismaAppointmentRepository().deleteById(id);

    if (!responseDelete.status) {
      await new CreateLog().execute(responseDelete);
    }

    return responseDelete;
  }
}