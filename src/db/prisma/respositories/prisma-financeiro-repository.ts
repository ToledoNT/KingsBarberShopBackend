import { PrismaClient } from "@prisma/client";
import { ICreateFinanceiro } from "../../../interface/financeiro/create-financeiro-interface";
import { ResponseTemplateInterface } from "../../../interface/response-template-interface";

const prisma = new PrismaClient();

export class PrismaFinanceiroRepository {
  async create(financeiro: ICreateFinanceiro): Promise<ResponseTemplateInterface> {
    try {
      const created = await prisma.financeiro.create({
        data: {
          agendamentoId: financeiro.agendamentoId,
          clienteNome: financeiro.clienteNome, // <- obrigatório
          valor: financeiro.valor,
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

  // ✅ GET ALL Financeiro
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
}