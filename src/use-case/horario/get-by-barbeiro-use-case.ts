import { PrismaHorarioRepository } from "../../db/prisma/respositories/prisma-horario-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class GetHorariosByBarbeiroUseCase {
  async execute(barbeiroId: string): Promise<ResponseTemplateInterface> {
    const response = await new PrismaHorarioRepository().getByBarbeiro(barbeiroId);

    if (!response.status) {
      await new CreateLog().execute(response);
    }

    return response;
  }
}