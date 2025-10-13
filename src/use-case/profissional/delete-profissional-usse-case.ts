import { PrismaProfessionalRepository } from "../../db/prisma/respositories/prisma-profissional-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class DeleteProfissionalUseCase {
  async execute(id: string): Promise<ResponseTemplateInterface> {
    const repository = new PrismaProfessionalRepository();

    const deleteResult = await repository.deleteById(id);

    if (!deleteResult.status) {
      await new CreateLog().execute(deleteResult);
    }

    return deleteResult;
  }
}