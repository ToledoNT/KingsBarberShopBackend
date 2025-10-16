import { PrismaProfessionalRepository } from "../../db/prisma/respositories/prisma-profissional-repository";
import { IUpdateProfessional } from "../../interface/profissional/update-profissional-interface";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class UpdateProfissionalUseCase {
  async execute(data: IUpdateProfessional): Promise<ResponseTemplateInterface> {
    const repository = new PrismaProfessionalRepository();

    const responseUpdate = await repository.update(data);

    if (!responseUpdate.status) {
      await new CreateLog().execute(responseUpdate);
    }

    return responseUpdate;
  }
}