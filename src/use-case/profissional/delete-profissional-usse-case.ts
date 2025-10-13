import { PrismaProfessionalRepository } from "db/prisma/respositories/prisma-profissional-repository";
import type { ResponseTemplateInterface } from "interface/response-template-interface";
import { CreateLog } from "use-case/logs/create-log";

export class DeleteProfissionalUseCase {
  async execute(id: string): Promise<ResponseTemplateInterface> {
    const repository = new PrismaProfessionalRepository();

    const deleteResult = await repository.deleteById(id);

    if (!deleteResult.status) {
      // Registra log caso haja erro
      await new CreateLog().execute(deleteResult);
    }

    return deleteResult;
  }
}
