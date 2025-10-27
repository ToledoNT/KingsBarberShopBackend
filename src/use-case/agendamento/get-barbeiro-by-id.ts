import { PrismaProfessionalRepository } from "../../db/prisma/respositories/prisma-profissional-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface"; // Interface de resposta
import { CreateLog } from "../logs/create-log"; // Para criar logs, caso necessário

export class GetBarbeiroByIdUseCase {
  async execute(barbeiroId: string): Promise<ResponseTemplateInterface> {
    const response = await new PrismaProfessionalRepository().getById(barbeiroId);

    if (!response.status) {
      await new CreateLog().execute(response);
    }

    return response;
  }
}