import { PrismaHorarioRepository } from "../../db/prisma/respositories/prisma-horario-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class GetHorarioByIdUseCase {
  async execute(id: string): Promise<ResponseTemplateInterface> {
    const horario = await new PrismaHorarioRepository().findById(id);

     if (!horario.status) {
      await new CreateLog().execute(horario);
    }

    return horario;
  }
}