import { PrismaAppointmentRepository } from "../../db/prisma/respositories/prisma-agendamento-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";
export class GetAppointmentByIdUseCase {
  async execute(id: string): Promise<ResponseTemplateInterface> {
    
    const response = await new PrismaAppointmentRepository().findById(id);

    if (!response.status) {
      const errorResponse: ResponseTemplateInterface = {
        status: false,
        code: 404,
        message: `Agendamento com id ${id} não encontrado.`,
        data: [],
      };

      await new CreateLog().execute(errorResponse);
      return errorResponse;
    }

    // ✅ retorna só o data interno
    return {
      status: true,
      code: 200,
      message: "Agendamento encontrado com sucesso.",
      data: response.data, 
    };
  }
}