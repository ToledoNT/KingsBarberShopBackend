import { PrismaProcedimentoRepository } from "../../db/prisma/respositories/prisma-procedimento-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class GetAllProcedimentosUseCase {
  async execute(): Promise<ResponseTemplateInterface> {
    const responseGetAll = await new PrismaProcedimentoRepository().getAll();

    if (!responseGetAll.status) {
      await new CreateLog().execute(responseGetAll);
    }

    return responseGetAll;
  }
}