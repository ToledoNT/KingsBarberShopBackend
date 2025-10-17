import { prisma } from "../prisma-connection";
import { IUpdateRelatorio } from "../../../interface/relatorio/update-relatorio-interface";
import { ResponseTemplateInterface } from "../../../interface/response-template-interface";
import { ResponseTemplateModel } from "../../../model/response-templete-model";
import { UpdateRelatorioModel } from "../../../model/relatorio/relatorio-model";

export class PrismaRelatorioRepository {
  async create(data: IUpdateRelatorio): Promise<ResponseTemplateInterface> {
    try {
      const relatorioModel = new UpdateRelatorioModel(data);

      const relatorio = await prisma.relatorio.create({
        data: relatorioModel.toPayload(),
      });

      return new ResponseTemplateModel(true, 201, "Relatório criado com sucesso", relatorio);
    } catch (error: any) {
      console.error("Erro ao criar relatório:", error);
      return new ResponseTemplateModel(false, 500, `Erro interno ao criar relatório: ${error.message}`, []);
    }
  }

async update(id: string, data: Partial<IUpdateRelatorio> & { mesAno: Date }): Promise<ResponseTemplateInterface> {
  try {
    if (!data.mesAno) {
      throw new Error("Campo mesAno é obrigatório ao atualizar o relatório");
    }

    const relatorioModel = new UpdateRelatorioModel(data);

    const relatorio = await prisma.relatorio.update({
      where: { id },
      data: relatorioModel.toPayload(),
    });

    return new ResponseTemplateModel(true, 200, "Relatório atualizado com sucesso", relatorio);
  } catch (error: any) {
    console.error("Erro ao atualizar relatório:", error);
    return new ResponseTemplateModel(false, 500, `Erro interno ao atualizar relatório: ${error.message}`, []);
  }
}

async findByMesAno(mesAno: Date): Promise<ResponseTemplateInterface> {
    try {
      const startOfMonth = new Date(mesAno.getFullYear(), mesAno.getMonth(), 1, 0, 0, 0, 0);

      const relatorio = await prisma.relatorio.findFirst({
        where: {
          mesAno: startOfMonth,
        },
      });

      if (relatorio) {
        return new ResponseTemplateModel(true, 200, "Relatório encontrado", relatorio);
      }

      return new ResponseTemplateModel(true, 200, "Relatório não existe", null);
    } catch (error: any) {
      console.error("Erro ao buscar relatório:", error);
      return new ResponseTemplateModel(false, 500, `Erro ao buscar relatório: ${error.message}`, []);
    }
  }
}