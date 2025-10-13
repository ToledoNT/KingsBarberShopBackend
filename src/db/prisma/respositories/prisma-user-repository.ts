
import { ResponseTemplateInterface } from "interface/response-template-interface.js";
import { prisma } from ".././prisma-connection"
import { ICreateUser } from "interface/user/create-user-interface.js";
import { ResponseTemplateModel } from "model/response-templete-model.js";

export class PrismaUserRepository {
async create(data: ICreateUser): Promise<ResponseTemplateInterface> {
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password, 
      },
    });

    return new ResponseTemplateModel(true, 201, "Usuário criado com sucesso", user);

  } catch (error: any) {
    console.error("Erro ao criar usuário:", error);

    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return new ResponseTemplateModel(false, 409, "E-mail já está em uso", []);
    }

    return new ResponseTemplateModel(false, 500, "Erro interno ao criar usuário", []);
  }
}
}