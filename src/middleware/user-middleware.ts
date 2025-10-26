import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../interface/user/create-user-interface";

export class UserMiddleware {
  // Validação de criação de usuário
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
      return;
    }

    next();
  }

  // Validação de login
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
      return;
    }

    next();
  }

  async handleAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.cookies.token; 

    if (!token) {
      res.status(401).json({
        status: false,
        code: 401,
        message: "Token não fornecido",
        data: null,
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    (req as any).user = decoded;

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

  authorizeRoles(...roles: UserRole[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;

      if (!user) {
        return res.status(401).json({ message: "Token não fornecido." });
      }

      // padronizando role para maiúsculas
      if (!roles.includes(user.role.toUpperCase() as UserRole)) {
        return res.status(403).json({ message: "Acesso negado." });
      }

      next();
    };
  }

  // Logout
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