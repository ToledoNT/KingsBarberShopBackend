import { PrismaProfessionalRepository } from "../../db/prisma/respositories/prisma-profissional-repository";
import { ICreateProfessional } from "../../interface/profissional/create-profissional";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class CreateProfissionalUseCase {
  async execute(professional: ICreateProfessional): Promise<ResponseTemplateInterface> {
    const responseCreate = await new PrismaProfessionalRepository().create(professional);

    if (!responseCreate.status) {
      await new CreateLog().execute(responseCreate);
    }

    return responseCreate;
  }
}