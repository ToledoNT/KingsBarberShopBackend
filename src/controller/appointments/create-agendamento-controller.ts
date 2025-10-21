import { Request, Response } from "express";
import { ICreateAppointment } from "../../interface/agendamentos/create-agendamento-interface";
import { CreateAppointmentUseCase } from "../../use-case/agendamento/create-agendamento-use-case";
import { GetHorarioByIdUseCase } from "../../use-case/horario/get-horario-by-id-use-case";
import { DeleteHorarioUseCase } from "../../use-case/horario/delete-horario-use-case";
import { UpdateRelatorioUseCase } from "../../use-case/relatorio/update-relatorio-use-case";

export class CreateAppointmentController {
  async handle(req: Request, res: Response): Promise<void> {
    const data: ICreateAppointment & { inicio?: string; fim?: string } = {
      nome: req.body.nome,
      telefone: req.body.telefone,
      email: req.body.email,
      data: req.body.data,
      hora: req.body.hora,
      servico: req.body.servico,
      profissional: req.body.profissional || req.body.barbeiro,
      inicio: req.body.inicio,
      fim: req.body.fim,
    };

    if (
      !data.nome ||
      !data.telefone ||
      !data.email ||
      !data.data ||
      !data.hora ||
      !data.servico ||
      !data.profissional ||
      !data.inicio ||
      !data.fim
    ) {
      res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
      return;
    }

    const horarioResponse = await new GetHorarioByIdUseCase().execute(data.hora);
    if (!horarioResponse?.status || !horarioResponse.data) {
      res.status(404).json({ message: "Horário não encontrado." });
      return;
    }

    const horario = horarioResponse.data;
    const horarioData = horario.data ? new Date(horario.data) : null;
    const dataAgendamento = data.data ? new Date(data.data) : null;

    if (!horarioData || isNaN(horarioData.getTime()) || !dataAgendamento || isNaN(dataAgendamento.getTime())) {
      res.status(400).json({ message: "Data inválida." });
      return;
    }

    const mesmaData = horarioData.toISOString().slice(0, 10) === dataAgendamento.toISOString().slice(0, 10);
    const mesmoInicio = horario.inicio === data.inicio;
    const mesmoFim = horario.fim === data.fim;
    const mesmoProfissional = horario.profissionalId === data.profissional;

    if (!mesmaData || !mesmoInicio || !mesmoFim || !mesmoProfissional) {
      res.status(409).json({ message: "O horário não corresponde ao registrado. Verifique os dados." });
      return;
    }

    const appointmentResult = await new CreateAppointmentUseCase().execute(data);
    if (!appointmentResult?.status) {
      res.status(500).json({ message: "Erro ao criar agendamento." });
      return;
    }

    const deleteResult = await new DeleteHorarioUseCase().execute(data.hora);
    if (!deleteResult?.status) {
      console.warn("Falha ao remover o horário utilizado:", deleteResult.message);
    }

    const updateRelatorioUseCase = new UpdateRelatorioUseCase();
    await updateRelatorioUseCase.execute({
      mesAno: new Date(dataAgendamento.getFullYear(), dataAgendamento.getMonth(), 1),
      agendamentos: 1, 
    });

    res.status(201).json(appointmentResult);
  }
}