import { PrismaFinanceiroRepository } from "../../db/prisma/respositories/prisma-financeiro-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class GetAllFinanceiroUseCase {
  async execute(): Promise<ResponseTemplateInterface> {
    const responseGetAll = await new PrismaFinanceiroRepository().getAll();

    if (!responseGetAll.status) {
      await new CreateLog().execute(responseGetAll);
    }

    return responseGetAll;
  }
}