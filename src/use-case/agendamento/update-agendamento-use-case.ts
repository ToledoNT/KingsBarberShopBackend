import { PrismaAppointmentRepository } from "../../db/prisma/respositories/prisma-agendamento-repository";
import { IUpdateAppointment } from "../../interface/agendamentos/update-agendamento-interface";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class UpdateAppointmentUseCase {
  async execute(data: IUpdateAppointment): Promise<ResponseTemplateInterface> {
    const responseUpdate = await new PrismaAppointmentRepository().update(data);

    if (!responseUpdate.status) {
      await new CreateLog().execute(responseUpdate);
    }

    return responseUpdate;
  }
}