import type { Request, Response } from "express";
import { StatusAgendamento } from "../../interface/agendamentos/create-agendamento-interface";
import { UpdateAppointmentUseCase } from "../../use-case/agendamento/update-agendamento-use-case";
import { CreateFinanceiroUseCase } from "../../use-case/financeiro/create-financeiro-use-case";
import { GetAppointmentByIdUseCase } from "../../use-case/agendamento/get-agendamento-by-id-use-case";
import { UpdateRelatorioUseCase } from "../../use-case/relatorio/relatorio-use-case";

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

    // Busca o agendamento completo antes de atualizar o status
    const getAppointmentUseCase = new GetAppointmentByIdUseCase();
    const appointmentResponse = await getAppointmentUseCase.execute(id);

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

    // Bloqueia alteração se já estiver concluído
    if (agendamento.status === StatusAgendamento.CONCLUIDO && status !== StatusAgendamento.CONCLUIDO) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "Agendamento já concluído não pode ter o status alterado",
        data: [],
      });
      return;
    }

    // Atualiza o status do agendamento
    const updateUseCase = new UpdateAppointmentUseCase();
    const updatedAppointment = await updateUseCase.execute({ id, status });

    // Se for concluído e antes não estava concluído, cria financeiro e atualiza relatório
    if (status === StatusAgendamento.CONCLUIDO && agendamento.status !== StatusAgendamento.CONCLUIDO) {
      const clienteNome = agendamento.nome ?? "Cliente não informado";
      const valor = agendamento.servicoPreco ?? agendamento.servico?.valor ?? 0;

      // Cria lançamento financeiro
      const createFinanceiroUseCase = new CreateFinanceiroUseCase();
      await createFinanceiroUseCase.execute({
        agendamentoId: agendamento.id,
        clienteNome,
        valor,
        status: "Pago",
      });

      console.log(`[Financeiro] Lançamento criado: ${clienteNome} - R$${valor}`);

      // Atualiza relatório mensal
      const updateRelatorioUseCase = new UpdateRelatorioUseCase();
      await updateRelatorioUseCase.execute({
        mesAno: new Date(agendamento.criadoEm.getFullYear(), agendamento.criadoEm.getMonth(), 1),
        faturamento: valor,
      });

      console.log(`[Relatório] Relatório do mês atualizado com valor: R$${valor}`);
    }

    res.status(200).json({
      status: true,
      code: 200,
      message: "Agendamento atualizado com sucesso",
      data: updatedAppointment,
    });
  }
}