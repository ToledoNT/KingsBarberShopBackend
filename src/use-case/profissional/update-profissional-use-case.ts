import { PrismaProfessionalRepository } from "db/prisma/respositories/prisma-profissional-repository";
import { IUpdateProfessional } from "interface/profissional/update-profissional-interface";
import type { ResponseTemplateInterface } from "interface/response-template-interface";
import { CreateLog } from "use-case/logs/create-log";

export class UpdateProfissionalUseCase {
  async execute(data: IUpdateProfessional): Promise<ResponseTemplateInterface> {
    const responseUpdate = await new PrismaProfessionalRepository().update(data);

    if (!responseUpdate.status) {
      // Registra log caso haja erro
      await new CreateLog().execute(responseUpdate);
    }

    return responseUpdate;
  }
}