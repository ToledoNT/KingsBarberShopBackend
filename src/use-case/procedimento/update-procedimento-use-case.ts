import { PrismaProcedimentoRepository } from "../../db/prisma/respositories/prisma-procedimento-repository";
import { IUpdateProcedimento } from "../../interface/procedimento/update-procedimento-interface";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class UpdateProcedimentoUseCase {
  async execute(id: string, procedimento: IUpdateProcedimento): Promise<ResponseTemplateInterface> {
    const responseUpdate = await new PrismaProcedimentoRepository().update(id, procedimento);

    if (!responseUpdate.status) {
      await new CreateLog().execute(responseUpdate);
    }

    return responseUpdate;
  }
}