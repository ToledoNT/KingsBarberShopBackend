import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export class UserMiddleware {
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
        message: `Os seguintes campos obrigatórios estão faltando: ${missingFields.join(", ")}`,
        data: []
      });
      return;
    }

    next();
  }

  async handleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;
    const missingFields: string[] = [];
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
      res.status(400).json({
        status: false,
        code: 400,
        message: `Os seguintes campos obrigatórios estão faltando: ${missingFields.join(", ")}`,
        data: []
      });
      return;
    }

    next();
  }

  // Middleware de autenticação JWT
  async handleAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({
        status: false,
        code: 401,
        message: "Token não fornecido",
        data: null
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      (req as any).user = decoded; // aqui fica o payload decodificado
      next();
    } catch {
      res.status(401).json({
        status: false,
        code: 401,
        message: "Token inválido",
        data: null
      });
    }
  }
}