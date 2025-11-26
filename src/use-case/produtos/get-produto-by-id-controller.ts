import { PrismaProdutoRepository } from "../../db/prisma/respositories/prisma-produtos-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class GetProdutoByIdUseCase {
  async execute(id: string): Promise<ResponseTemplateInterface> {
    const response = await new PrismaProdutoRepository().getById(id);

    if (!response.status) {
      await new CreateLog().execute(response);
    }

    return response;
  }
}