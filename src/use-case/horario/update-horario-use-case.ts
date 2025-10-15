import { PrismaHorarioRepository } from "../../db/prisma/respositories/prisma-horario-repository";
import { IUpdateHorario } from "../../interface/horario/update-horario";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class UpdateHorarioUseCase {
  async execute(id: string, horario: IUpdateHorario): Promise<ResponseTemplateInterface> {
    const responseUpdate = await new PrismaHorarioRepository().update(id, horario);

    if (!responseUpdate.status) {
      await new CreateLog().execute(responseUpdate);
    }

    return responseUpdate;
  }
}