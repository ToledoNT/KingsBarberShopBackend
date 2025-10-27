import { Request, Response } from "express";
import { ICreateAppointment, StatusAgendamento } from "../../interface/agendamentos/create-agendamento-interface";
import { CreateAppointmentUseCase } from "../../use-case/agendamento/create-agendamento-use-case";
import { GetHorarioByIdUseCase } from "../../use-case/horario/get-horario-by-id-use-case";
import { DeleteHorarioUseCase } from "../../use-case/horario/delete-horario-use-case";
import { UpdateRelatorioUseCase } from "../../use-case/relatorio/update-relatorio-use-case";
import { GetBarbeiroByIdUseCase } from "../../use-case/agendamento/get-barbeiro-by-id";

export class CreateAppointmentController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const data: ICreateAppointment = {
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email,
        data: req.body.data,
        hora: req.body.hora,
        servico: req.body.servico,
        profissional: req.body.barbeiro,
        inicio: req.body.inicio,
        fim: req.body.fim,
        status: StatusAgendamento.AGENDADO,
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

      const barbeiroResponse = await new GetBarbeiroByIdUseCase().execute(data.profissional);
      if (!barbeiroResponse?.status || !barbeiroResponse.data) {
        res.status(404).json({ message: "Barbeiro não encontrado." });
        return;
      }

      const horarioResponse = await new GetHorarioByIdUseCase().execute(data.hora);
      
      if (!horarioResponse?.status || !horarioResponse.data) {
        res.status(404).json({ message: "Horário não encontrado." });
        return;
      }

      const horario = horarioResponse.data.data; 

      const normalizarData = (dataString: string): string => {
        try {
          if (/^\d{4}-\d{2}-\d{2}$/.test(dataString)) {
            return dataString;
          }
          
          const data = new Date(dataString);
          if (isNaN(data.getTime())) {
            throw new Error('Data inválida');
          }
          
          const ano = data.getFullYear();
          const mes = String(data.getMonth() + 1).padStart(2, '0');
          const dia = String(data.getDate()).padStart(2, '0');
          
          return `${ano}-${mes}-${dia}`;
        } catch (error) {
          console.error('Erro ao normalizar data:', dataString, error);
          throw new Error(`Data inválida: ${dataString}`);
        }
      };

      const horarioDataNormalizada = normalizarData(horario.data);
      const dataAgendamentoNormalizada = normalizarData(data.data);

      const mesmaData = horarioDataNormalizada === dataAgendamentoNormalizada;

      const mesmoInicio = horario.inicio === data.inicio;
      const mesmoFim = horario.fim === data.fim;
      const mesmoProfissional = horario.profissionalId === data.profissional;

      if (!mesmaData || !mesmoInicio || !mesmoFim || !mesmoProfissional) {
        res.status(409).json({ 
          message: "O horário não corresponde ao registrado. Verifique os dados.",
          details: {
            mesmaData,
            mesmoInicio,
            mesmoFim,
            mesmoProfissional,
            horarioData: horarioDataNormalizada,
            agendamentoData: dataAgendamentoNormalizada
          }
        });
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
        mesAno: new Date(new Date(dataAgendamentoNormalizada).getFullYear(), new Date(dataAgendamentoNormalizada).getMonth(), 1),
        agendamentos: 1,
      });

      res.status(201).json(appointmentResult);
      
    } catch (error) {
      console.error("Erro no CreateAppointmentController:", error);
      res.status(500).json({ 
        message: "Erro interno do servidor.",
        error: error instanceof Error ? error.message : "Erro desconhecido"
      });
    }
  }
}