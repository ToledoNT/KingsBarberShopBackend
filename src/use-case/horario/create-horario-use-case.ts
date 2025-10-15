import { PrismaHorarioRepository } from "../../db/prisma/respositories/prisma-horario-repository";
import { ICreateHorario } from "../../interface/horario/create-horario-interface";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class CreateHorarioUseCase {
  async execute(horario: ICreateHorario): Promise<ResponseTemplateInterface> {
    const responseCreate = await new PrismaHorarioRepository().create(horario);

    if (!responseCreate.status) {
      await new CreateLog().execute(responseCreate);
    }

    return responseCreate;
  }
}