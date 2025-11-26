import { PrismaProdutoRepository } from "../../db/prisma/respositories/prisma-produtos-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class GetAllProdutosUseCase {
  async execute(): Promise<ResponseTemplateInterface> {
    const responseGetAll = await new PrismaProdutoRepository().getAll();

    if (!responseGetAll.status) {
      await new CreateLog().execute(responseGetAll);
    }

    return responseGetAll;
  }
}