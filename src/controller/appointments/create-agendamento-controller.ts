import { Request, Response } from "express";
import { ICreateAppointment } from "../../interface/agendamentos/create-agendamento-interface";
import { CreateAppointmentUseCase } from "../../use-case/agendamento/create-agendamento-use-case";
import { GetHorarioByIdUseCase } from "../../use-case/horario/get-horario-by-id-use-case";
import { DeleteHorarioUseCase } from "../../use-case/horario/delete-horario-use-case";

export class CreateAppointmentController {
  async handle(req: Request, res: Response): Promise<void> {
    const {
      nome,
      telefone,
      email,
      hora: horaId,
      servico,
      status = "Pendente",
    } = req.body;

    if (!nome || !telefone || !email || !horaId || !servico) {
      res.status(400).json({ message: "Campos obrigatórios faltando." });
      return;
    }

    const horarioResponse = await new GetHorarioByIdUseCase().execute(horaId);
    if (!horarioResponse?.data) {
      res.status(404).json({ message: "Horário não encontrado ou já ocupado." });
      return;
    }

    const horario = horarioResponse.data;

    const appointmentData: ICreateAppointment & { inicio: string; fim: string } = {
      nome,
      telefone,
      email,
      servico,
      profissional: horario.profissionalId,
      hora: horario.id,
      inicio: horario.inicio,
      fim: horario.fim,
      data: horario.data,
      status,
    };

    const appointmentResult = await new CreateAppointmentUseCase().execute(appointmentData);
    console.log(appointmentData)
    if (!appointmentResult?.status) {
      res.status(500).json({ message: "Erro ao criar agendamento." });
      return;
    }

    if (horario.id) {
      await new DeleteHorarioUseCase().execute(horario.id);
    }

    res.status(201).json(appointmentResult);
  }
}
//Criar Log de Agendamento, por cliente ou por Admin >< 