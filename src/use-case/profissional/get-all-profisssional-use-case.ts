import { PrismaProfessionalRepository } from "../../db/prisma/respositories/prisma-profissional-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class GetAllProfessionalsUseCase {
  async execute(): Promise<ResponseTemplateInterface> {
    const repository = new PrismaProfessionalRepository();
    
    const allProfessionals = await repository.getAll();

    if (!allProfessionals.status) {
      await new CreateLog().execute(allProfessionals);
    }

    return allProfessionals;
  }
}