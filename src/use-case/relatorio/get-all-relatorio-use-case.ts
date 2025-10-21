import { PrismaAppointmentRepository } from "../../db/prisma/respositories/prisma-agendamento-repository";
import { PrismaRelatorioRepository } from "../../db/prisma/respositories/prisma-relatorio-repositorio";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class GetAllRelatorioUseCase {
  async execute(): Promise<ResponseTemplateInterface> {
    const response = await new PrismaRelatorioRepository().getAll();

    if (!response.status) {
      await new CreateLog().execute(response);
    }

    return response;
  }
}