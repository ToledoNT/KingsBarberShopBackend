import { PrismaProfessionalRepository } from "db/prisma/respositories/prisma-profissional-repository";
import type { ResponseTemplateInterface } from "interface/response-template-interface";

export class GetAllProfessionalsUseCase {
  async execute(): Promise<ResponseTemplateInterface> {
    const repository = new PrismaProfessionalRepository();

    const allProfessionals = await repository.getAll();

    return allProfessionals;
  }
}
