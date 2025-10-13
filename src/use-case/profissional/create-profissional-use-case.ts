import { PrismaProfessionalRepository } from "db/prisma/respositories/prisma-profissional-repository";
import { ICreateProfessional } from "interface/profissional/create-profissional";
import type { ResponseTemplateInterface } from "interface/response-template-interface";
import { CreateLog } from "use-case/logs/create-log";

export class CreateProfissionalUseCase {
  async execute(professional: ICreateProfessional): Promise<ResponseTemplateInterface> {
    const responseCreate = await new PrismaProfessionalRepository().create(professional);

    if (!responseCreate.status) {
      // Registra log caso haja erro
      await new CreateLog().execute(responseCreate);
    }

    return responseCreate;
  }
}