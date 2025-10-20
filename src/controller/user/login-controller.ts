import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GetUserByEmailUseCase } from "../../use-case/user/get-user-by-email-use-case";

export class LoginUserController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
         res.status(400).json({
          status: false,
          code: 400,
          message: "Os campos 'email' e 'password' são obrigatórios.",
          data: null,
        });
      }

      const userResult = await new GetUserByEmailUseCase().execute(email);
      if (!userResult.status || !userResult.data) {
         res.status(401).json({
          status: false,
          code: 401,
          message: "Usuário ou senha inválidos",
          data: null,
        });
      }

      const user = userResult.data;
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
         res.status(401).json({
          status: false,
          code: 401,
          message: "Usuário ou senha inválidos",
          data: null,
        });
      }

      // ✅ Gera token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      );

      // 🔑 Configuração do cookie (comentado para testes)
      /*
      res.cookie("token", token, {
        httpOnly: true,   // 🔹 deixar comentado por enquanto
        secure: false,    // 🔹 false em dev/localhost
        sameSite: "lax",  // 🔹 "lax" ou "strict"
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      });
      */

      // ✅ Retorna sucesso com token no JSON
      res.status(200).json({
        status: true,
        code: 200,
        message: "Login realizado com sucesso",
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          token, // 🔹 token retornado para uso no front
        },
      });
    } catch (err) {
      console.error("Erro no login:", err);
      res.status(500).json({
        status: false,
        code: 500,
        message: "Erro interno ao realizar login",
        data: null,
      });
    }
  }
}