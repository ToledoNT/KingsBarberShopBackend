import { PrismaProdutoRepository } from "../../db/prisma/respositories/prisma-produtos-repository";
import { ICreateProduto } from "../../interface/produtos/create-produto-interface";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class CreateProdutoUseCase {
  async execute(produto: ICreateProduto): Promise<ResponseTemplateInterface> {
    const responseCreate = await new PrismaProdutoRepository().create(produto);

    if (!responseCreate.status) {
      await new CreateLog().execute(responseCreate);
    }

    return responseCreate;
  }
}