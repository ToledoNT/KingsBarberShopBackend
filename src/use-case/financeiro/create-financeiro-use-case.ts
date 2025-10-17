import { PrismaFinanceiroRepository } from "../../db/prisma/respositories/prisma-financeiro-repository";
import { ICreateFinanceiro } from "../../interface/financeiro/create-financeiro-interface";
import { CreateLog } from "../logs/create-log";

export class CreateFinanceiroUseCase {
  async execute(data: ICreateFinanceiro) {
    console.log("Criando lançamento financeiro...");

    const repository = new PrismaFinanceiroRepository();
    const response = await repository.create(data);

    if (response.status) {
      return response.data;
    } else {
      console.error("Erro ao criar lançamento financeiro:", response.error);

      await new CreateLog().execute(response);

      return null;
    }
  }
}