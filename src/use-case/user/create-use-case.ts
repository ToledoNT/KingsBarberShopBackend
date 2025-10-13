import { PrismaUserRepository } from "../../db/prisma/respositories/prisma-user-repository";
import { ResponseTemplateInterface } from "../../interface/response-template-interface";
import { ICreateUser } from "../../interface/user/create-user-interface";
import { CreateLog } from "../logs/create-log";

export class CreateUser {
  async execute(conta: ICreateUser): Promise<ResponseTemplateInterface> {
    const responseCreate = await new PrismaUserRepository().create(conta);
    if (!responseCreate.status) {
      await new CreateLog().execute(responseCreate);
    }
    return responseCreate;
  }
}