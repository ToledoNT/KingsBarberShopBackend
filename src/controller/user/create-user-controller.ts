import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { CreateUserModel } from "../../model/user/create-user-model";
import { ICreateUser } from "../../interface/user/create-user-interface";
import { CreateUser } from "../../use-case/user/create-use-case";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        status: false,
        code: 400,
        message: "The fields 'name', 'email' and 'password' are required.",
        data: []
      });
      return;
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria payload usando model
    const payload: ICreateUser = new CreateUserModel({
      name,
      email,
      password: hashedPassword
    }).toPayload();

    // Executa use-case
    const createdUserResult = await new CreateUser().execute(payload);

    res.status(createdUserResult.code).json(createdUserResult);
  }
}