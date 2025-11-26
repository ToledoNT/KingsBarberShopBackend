import { PrismaProdutoRepository } from "../../db/prisma/respositories/prisma-produtos-repository";
import { IUpdateProduto } from "../../interface/produtos/update-produto-interface";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { CreateLog } from "../logs/create-log";

export class UpdateProdutoUseCase {
  async execute(data: IUpdateProduto): Promise<ResponseTemplateInterface> {
    const responseUpdate = await new PrismaProdutoRepository().update(data);

    if (!responseUpdate.status) {
      await new CreateLog().execute(responseUpdate);
    }

    return responseUpdate;
  }
}
