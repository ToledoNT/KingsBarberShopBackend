import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export class UserMiddleware {
  // --------------------------
  // Valida criação de usuário
  // --------------------------
  async handleCreateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, email, password } = req.body;
    const missingFields: string[] = [];

    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
      res.status(400).json({
        status: false,
        code: 400,
        message: `Campos obrigatórios faltando: ${missingFields.join(", ")}`,
        data: null,
      });
      return; // interrompe execução
    }

    next();
  }

  // --------------------------
  // Valida login
  // --------------------------
  async handleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;
    const missingFields: string[] = [];

    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
      res.status(400).json({
        status: false,
        code: 400,
        message: `Campos obrigatórios faltando: ${missingFields.join(", ")}`,
        data: null,
      });
      return; // interrompe execução
    }

    next();
  }

  // --------------------------
  // Autenticação JWT
  // --------------------------
  async handleAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Pega token do header Authorization: "Bearer <token>"
      const authHeader = req.headers['authorization'];
      const token = authHeader?.split(' ')[1]; 

      if (!token) {
        console.log("Token não fornecido");
        res.status(401).json({
          status: false,
          code: 401,
          message: "Token não fornecido",
          data: null,
        });
        return; // interrompe a execução
      }

      // Decodifica e verifica token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      // Armazena payload no req para uso futuro
      (req as any).user = decoded;

      // Continua para o próximo middleware
      next();
    } catch (err) {
      console.error("JWT inválido:", err);
      res.status(401).json({
        status: false,
        code: 401,
        message: "Token inválido ou expirado",
        data: null,
      });
    }
  }

  // --------------------------
  // Logout
  // --------------------------
  async handleLogout(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    res.status(200).json({
      status: true,
      code: 200,
      message: "Logout realizado com sucesso",
      data: null,
    });
  }
}