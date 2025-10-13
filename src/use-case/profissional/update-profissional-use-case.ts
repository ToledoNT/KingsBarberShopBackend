import { PrismaProfessionalRepository } from "../../db/prisma/respositories/prisma-profissional-repository";
import { IUpdateProfessional } from "../../interface/profissional/update-profissional-interface";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class UpdateProfissionalUseCase {
  async execute(data: IUpdateProfessional): Promise<ResponseTemplateInterface> {
    const responseUpdate = await new PrismaProfessionalRepository().update(data);

    if (!responseUpdate.status) {
      await new CreateLog().execute(responseUpdate);
    }

    return responseUpdate;
  }
}