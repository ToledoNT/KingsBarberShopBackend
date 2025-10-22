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
        return;
      }

      const userResult = await new GetUserByEmailUseCase().execute(email);

      if (!userResult.status || !userResult.data) {
        res.status(401).json({
          status: false,
          code: 401,
          message: "Usuário ou senha inválidos.",
          data: null,
        });
        return;
      }

      const user = userResult.data;

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({
          status: false,
          code: 401,
          message: "Usuário ou senha inválidos.",
          data: null,
        });
        return;
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      );

      // 🔑 Cookie comentado (mantido para referência futura)
      /*
      res.cookie("token", token, {
        httpOnly: true,   // 🔹 Protege contra JS no front
        secure: false,    // 🔹 false em dev/localhost, true em produção
        sameSite: "lax",  // 🔹 "lax" ou "strict"
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      });
      */

      // ✅ Retorno de sucesso com token e role
      res.status(200).json({
        status: true,
        code: 200,
        message: "Login realizado com sucesso.",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, 
          token,
        },
      });
    } catch (err) {
      console.error("Erro no login:", err);
      res.status(500).json({
        status: false,
        code: 500,
        message: "Erro interno ao realizar login.",
        data: null,
      });
    }
  }
}