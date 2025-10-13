import { PrismaAppointmentRepository } from "../../db/prisma/respositories/prisma-agendamento-repository";
import { ICreateAppointment } from "../../interface/agendamentos/create-agendamento-interface";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class CreateAppointmentUseCase {
  async execute(appointment: ICreateAppointment): Promise<ResponseTemplateInterface> {
    const responseCreate = await new PrismaAppointmentRepository().create(appointment);

    if (!responseCreate.status) {
      await new CreateLog().execute(responseCreate);
    }

    return responseCreate;
  }
}