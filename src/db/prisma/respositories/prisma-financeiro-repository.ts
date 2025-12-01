import { PrismaClient } from "@prisma/client";
import { ICreateFinanceiro } from "../../../interface/financeiro/create-financeiro-interface";
import { IUpdateFinanceiro } from "../../../interface/financeiro/update-interface";
import { ResponseTemplateInterface } from "../../../interface/response-template-interface";

const prisma = new PrismaClient();

export class PrismaFinanceiroRepository {
async create(financeiro: ICreateFinanceiro): Promise<ResponseTemplateInterface> {
  try {
    const created = await prisma.financeiro.create({
      data: {
        agendamentoId: financeiro.agendamentoId ?? undefined, // opcional
        clienteNome: financeiro.clienteNome ?? "Cliente não informado",
        valor: financeiro.valor ?? 0,
        status: financeiro.status ?? "Pago",
        criadoEm: financeiro.criadoEm ?? new Date(),
        atualizadoEm: financeiro.atualizadoEm ?? new Date(),
      },
    });
    return {
      status: true,
      code: 201,
      message: "Lançamento financeiro criado com sucesso.",
      data: created,
    };
  } catch (err: any) {
    return {
      status: false,
      code: 500,
      message: "Erro ao criar lançamento financeiro.",
      data: [],
      error: err.message,
    };
  }
}


  async getAll(): Promise<ResponseTemplateInterface> {
    try {
      const allFinanceiro = await prisma.financeiro.findMany({
        orderBy: { criadoEm: "desc" },
      });

      return {
        status: true,
        code: 200,
        message: "Todos os lançamentos financeiros recuperados com sucesso.",
        data: allFinanceiro,
      };
    } catch (err: any) {
      return {
        status: false,
        code: 500,
        message: "Erro ao buscar lançamentos financeiros.",
        data: [],
        error: err.message,
      };
    }
  }

  async findById(id: string): Promise<ResponseTemplateInterface> {
    try {
      const financeiro = await prisma.financeiro.findUnique({
        where: { id },
      });

      if (!financeiro) {
        return {
          status: false,
          code: 404,
          message: "Lançamento financeiro não encontrado.",
          data: [],
        };
      }

      return {
        status: true,
        code: 200,
        message: "Lançamento financeiro encontrado com sucesso.",
        data: financeiro,
      };
    } catch (err: any) {
      return {
        status: false,
        code: 500,
        message: "Erro ao buscar lançamento financeiro.",
        data: [],
        error: err.message,
      };
    }
  }

  async update(id: string, financeiro: IUpdateFinanceiro): Promise<ResponseTemplateInterface> {
    try {
      const dataToUpdate: any = {
        atualizadoEm: financeiro.atualizadoEm ?? new Date(),
      };

      if (financeiro.agendamentoId !== undefined) dataToUpdate.agendamentoId = financeiro.agendamentoId;
      if (financeiro.valor !== undefined) dataToUpdate.valor = financeiro.valor;
      if (financeiro.status !== undefined) dataToUpdate.status = financeiro.status;

      const updated = await prisma.financeiro.update({
        where: { id },
        data: dataToUpdate,
      });

      return {
        status: true,
        code: 200,
        message: "Lançamento financeiro atualizado com sucesso.",
        data: updated,
      };
    } catch (err: any) {
      return {
        status: false,
        code: 500,
        message: "Erro ao atualizar lançamento financeiro.",
        data: [],
        error: err.message,
      };
    }
  }

  async delete(id: string): Promise<ResponseTemplateInterface> {
    try {
      const deleted = await prisma.financeiro.delete({
        where: { id },
      });

      return {
        status: true,
        code: 200,
        message: "Lançamento financeiro excluído com sucesso.",
        data: deleted,
      };
    } catch (err: any) {
      return {
        status: false,
        code: 500,
        message: "Erro ao excluir lançamento financeiro.",
        data: [],
        error: err.message,
      };
    }
  }

  async findByAgendamentoId(agendamentoId: string): Promise<ResponseTemplateInterface> {
    try {
      const financeiro = await prisma.financeiro.findFirst({
        where: { agendamentoId },
      });

      if (!financeiro) {
        return {
          status: false,
          code: 404,
          message: "Lançamento financeiro não encontrado.",
          data: [],
        };
      }

      return {
        status: true,
        code: 200,
        message: "Lançamento financeiro encontrado com sucesso.",
        data: financeiro,
      };
    } catch (err: any) {
      return {
        status: false,
        code: 500,
        message: "Erro ao buscar lançamento financeiro.",
        data: [],
        error: err.message,
      };
    }
  }
}