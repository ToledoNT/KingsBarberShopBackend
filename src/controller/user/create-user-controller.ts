import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ICreateUser } from "interface/user/create-user-interface.js";
import { CreateUserModel } from "model/user/create-user-model.js";
import { CreateUser } from "use-case/user/create-use-case";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    // Validação mínima
    if (!name || !email || !password) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "The fields 'name', 'email' and 'password' are required.",
        data: []
      });
      return;
    }

    // Hashear a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o payload mínimo
    const payload: ICreateUser = new CreateUserModel({
      name,
      email,
      password: hashedPassword
    }).toPayload();

    // Executa a criação
    const createdUserResult = await new CreateUser().execute(payload);

    // Retorna o resultado direto
    res.status(createdUserResult.code).json(createdUserResult);
  }
}