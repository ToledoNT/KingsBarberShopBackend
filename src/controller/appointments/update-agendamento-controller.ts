import type { Request, Response } from "express";
import { StatusAgendamento } from "../../interface/agendamentos/create-agendamento-interface";
import { UpdateAppointmentUseCase } from "../../use-case/agendamento/update-agendamento-use-case";
import { CreateFinanceiroUseCase } from "../../use-case/financeiro/create-financeiro-use-case";
import { GetAppointmentByIdUseCase } from "../../use-case/agendamento/get-agendamento-by-id-use-case";
import { UpdateRelatorioUseCase } from "../../use-case/relatorio/relatorio-use-case";
import { CreateHorarioUseCase } from "../../use-case/horario/create-horario-use-case";
import { ICreateHorario } from "../../interface/horario/create-horario-interface";

export class UpdateAppointmentController {
  async handle(req: Request, res: Response): Promise<void> {
    const { id, status } = req.body;

    if (!id || !status) {
      res.status(400).json({
        status: false,
        code: 400,
        message: `Campos obrigatórios faltando: ${!id ? "id" : ""} ${!status ? "status" : ""}`.trim(),
        data: [],
      });
      return;
    }

    const appointmentResponse = await new GetAppointmentByIdUseCase().execute(id);

    if (!appointmentResponse.status || !appointmentResponse.data?.data) {
      res.status(404).json({
        status: false,
        code: 404,
        message: "Agendamento não encontrado",
        data: [],
      });
      return;
    }

    const agendamento = appointmentResponse.data.data;

    const statusProtegidos = [
      StatusAgendamento.CONCLUIDO,
      StatusAgendamento.CANCELADO,
      StatusAgendamento.NAO_COMPARECEU,
    ];

    if (statusProtegidos.includes(agendamento.status) && status !== agendamento.status) {
      const mensagens: Partial<Record<StatusAgendamento, string>> = {
        [StatusAgendamento.CONCLUIDO]: "Agendamento já concluído não pode ter o status alterado",
        [StatusAgendamento.CANCELADO]: "Agendamento cancelado não pode ter o status alterado",
        [StatusAgendamento.NAO_COMPARECEU]: "Agendamento marcado como não compareceu não pode ter o status alterado",
      };

      res.status(400).json({
        status: false,
        code: 400,
        message: mensagens[agendamento.status as StatusAgendamento] ?? "Status inválido",
        data: [],
      });
      return;
    }

    const updatedAppointment = await new UpdateAppointmentUseCase().execute({ id, status });

    if (status === StatusAgendamento.CONCLUIDO && agendamento.status !== StatusAgendamento.CONCLUIDO) {
      const clienteNome = agendamento.nome ?? "Cliente não informado";
      const valor = agendamento.servicoPreco ?? agendamento.servico?.valor ?? 0;

      try {
        await new CreateFinanceiroUseCase().execute({
          agendamentoId: agendamento.id,
          clienteNome,
          valor,
          status: "Pago",
        });

        await new UpdateRelatorioUseCase().execute({
          mesAno: new Date(agendamento.criadoEm.getFullYear(), agendamento.criadoEm.getMonth(), 1),
          faturamento: valor,
        });

      } catch (err) {
        console.error("Erro ao processar financeiro/relatório:", err);
      }
    }

    if (status === StatusAgendamento.CANCELADO && agendamento.status !== StatusAgendamento.CANCELADO) {
      try {
        const horarioParaCriar: ICreateHorario = {
          profissionalId: agendamento.profissionalId,
          data: agendamento.data,
          inicio: agendamento.inicio,
          fim: agendamento.fim,
          disponivel: true,
        };

        await new CreateHorarioUseCase().execute(horarioParaCriar);
        console.log(`[Horário] Horário criado após cancelamento.`);

        const mesAno = new Date(
          agendamento.criadoEm.getFullYear(),
          agendamento.criadoEm.getMonth(),
          1
        );

        await new UpdateRelatorioUseCase().execute({
          mesAno,
          cancelados: 1,
        });

      } catch (err) {
        console.error("Erro ao criar horário/atualizar relatório após cancelamento:", err);
      }
    }

    if (status === StatusAgendamento.NAO_COMPARECEU && agendamento.status !== StatusAgendamento.NAO_COMPARECEU) {
      try {
        const mesAno = new Date(
          agendamento.criadoEm.getFullYear(),
          agendamento.criadoEm.getMonth(),
          1
        );

        await new UpdateRelatorioUseCase().execute({
          mesAno,
          naoCompareceu: 1,
        });

      } catch (err) {
        console.error("Erro ao atualizar relatório após não comparecimento:", err);
      }
    }

    res.status(200).json({
      status: true,
      code: 200,
      message: "Agendamento atualizado com sucesso",
      data: updatedAppointment,
    });
  }
}