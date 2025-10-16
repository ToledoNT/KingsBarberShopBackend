import { PrismaHorarioRepository } from "../../db/prisma/respositories/prisma-horario-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class GetHorarioByIdUseCase {
  async execute(id: string): Promise<ResponseTemplateInterface> {
    const horario = await new PrismaHorarioRepository().findById(id);

    if (!horario) {
      // Retorna ResponseTemplate com todos os campos
      const response: ResponseTemplateInterface = {
        status: false,
        code: 404, // código HTTP ou outro código de erro que você use
        message: "Horário não encontrado",
        data: null,
      };
      await new CreateLog().execute(response);
      return response;
    }

    // Retorna ResponseTemplate com todos os campos
    const response: ResponseTemplateInterface = {
      status: true,
      code: 200,
      message: "Horário encontrado",
      data: horario,
    };

    return response;
  }
}
