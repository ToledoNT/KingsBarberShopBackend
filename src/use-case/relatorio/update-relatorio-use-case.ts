import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";
import { IUpdateRelatorio } from "../../interface/relatorio/update-relatorio-interface";
import { PrismaRelatorioRepository } from "../../db/prisma/respositories/prisma-relatorio-repositorio";
import { UpdateRelatorioModel } from "../../model/relatorio/relatorio-model";

export class UpdateRelatorioUseCase {
  async execute(data: IUpdateRelatorio): Promise<ResponseTemplateInterface> {
    const repository = new PrismaRelatorioRepository();

    try {
      const mesAnoNormalized = new Date(
        data.mesAno.getFullYear(),
        data.mesAno.getMonth(),
        1,
        0,
        0,
        0,
        0
      );

      const existingReport = await repository.findByMesAno(mesAnoNormalized);

      let response: ResponseTemplateInterface;

      if (existingReport.status && existingReport.data) {
        // Atualiza apenas os campos que vieram no payload, somando aos existentes
        const updatedData: IUpdateRelatorio = {
          mesAno: mesAnoNormalized,
          agendamentos:
            data.agendamentos !== undefined
              ? (existingReport.data.agendamentos ?? 0) + data.agendamentos
              : existingReport.data.agendamentos ?? 0,
          faturamento:
            data.faturamento !== undefined
              ? (existingReport.data.faturamento ?? 0) + data.faturamento
              : existingReport.data.faturamento ?? 0,
          cancelados:
            data.cancelados !== undefined
              ? (existingReport.data.cancelados ?? 0) + data.cancelados
              : existingReport.data.cancelados ?? 0,
          naoCompareceu:
            data.naoCompareceu !== undefined
              ? (existingReport.data.naoCompareceu ?? 0) + data.naoCompareceu
              : existingReport.data.naoCompareceu ?? 0,
          vendidos:
            data.vendidos !== undefined
              ? (existingReport.data.vendidos ?? 0) + data.vendidos
              : existingReport.data.vendidos ?? 0,
          consumidos:
            data.consumidos !== undefined
              ? (existingReport.data.consumidos ?? 0) + data.consumidos
              : existingReport.data.consumidos ?? 0,
          pendentes:
            data.pendentes !== undefined
              ? (existingReport.data.pendentes ?? 0) + data.pendentes
              : existingReport.data.pendentes ?? 0,
        };

        const relatorioModel = new UpdateRelatorioModel(updatedData);
        response = await repository.update(existingReport.data.id, relatorioModel.toPayload());
      } else {
        const newRelatorio: IUpdateRelatorio = {
          mesAno: mesAnoNormalized,
          agendamentos: data.agendamentos ?? 0,
          faturamento: data.faturamento ?? 0,
          cancelados: data.cancelados ?? 0,
          naoCompareceu: data.naoCompareceu ?? 0,
        };

        const relatorioModel = new UpdateRelatorioModel(newRelatorio);
        response = await repository.create(relatorioModel.toPayload());
      }

      if (!response.status) {
        await new CreateLog().execute(response);
      }

      return response;
    } catch (err: any) {
      const logPayload = {
        status: false,
        code: 500,
        message: `Erro ao atualizar/criar relatório: ${err.message}`,
        data,
        error: err.message,
      };
      await new CreateLog().execute(logPayload);

      return {
        status: false,
        code: 500,
        message: "Erro ao atualizar/criar relatório",
        data: [],
        error: err.message,
      };
    }
  }
}