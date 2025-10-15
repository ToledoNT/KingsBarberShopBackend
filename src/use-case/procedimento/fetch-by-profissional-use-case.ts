import { PrismaProcedimentoRepository } from "../../db/prisma/respositories/prisma-procedimento-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class GetProcedimentosByProfissionalUseCase {
  async execute(id: string): Promise<ResponseTemplateInterface> {
    const responseGet = await new PrismaProcedimentoRepository().findByProfissionalId(id);

    if (!responseGet.status) {
      await new CreateLog().execute(responseGet);
    }

    return responseGet;
  }
}