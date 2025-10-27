import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { UserRole } from "../interface/user/create-user-interface";

// Tipando o Request com User
interface RequestWithUser extends Request {
  user?: JwtPayload;
}

export class UserMiddleware {
  // Rate Limiter para login
  public loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // máximo de 5 tentativas
    handler: (req: Request, res: Response) => {
      res.status(429).json({
        status: false,
        code: 429,
        message: "Muitas tentativas de login. Tente novamente mais tarde.",
        data: null,
      });
    },
  });

  // Validação de criação de usuário
  async handleCreateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, email, password } = req.body;
    const missingFields = ["name", "email", "password"].filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      res.status(400).json({
        status: false,
        code: 400,
        message: `Campos obrigatórios faltando: ${missingFields.join(", ")}`,
        data: null,
      });
    } else {
      next(); // Prossegue para o próximo middleware
    }
  }

  // Validação de login
  async handleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;
    const missingFields = ["email", "password"].filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      res.status(400).json({
        status: false,
        code: 400,
        message: `Campos obrigatórios faltando: ${missingFields.join(", ")}`,
        data: null,
      });
    } else {
      next(); // Passa para o próximo middleware
    }
  }

  // Validação e verificação de token
  async handleAuth(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.cookies.token;

      if (!token) {
        res.status(401).json({
          status: false,
          code: 401,
          message: "Token não fornecido",
          data: null,
        });
        return; // Interrompe o fluxo após o envio da resposta
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      if (!decoded || !decoded.id || !decoded.role) {
        res.status(401).json({
          status: false,
          code: 401,
          message: "Token inválido ou incompleto",
          data: null,
        });
        return; // Interrompe o fluxo após o envio da resposta
      }

      req.user = decoded; // Armazena as informações do usuário no request
      next(); // Prossegue para o próximo middleware
    } catch (err) {
      console.error("Erro ao verificar o token:", err);
      res.status(401).json({
        status: false,
        code: 401,
        message: "Token inválido ou expirado",
        data: null,
      });
    }
  }

  // Autorização por roles
  authorizeRoles(...roles: UserRole[]) {
    return (req: RequestWithUser, res: Response, next: NextFunction): void => {
      const user = req.user;

      if (!user) {
        res.status(401).json({ message: "Token não fornecido." });
        return; // Interrompe o fluxo após o envio da resposta
      }

      if (!roles.includes(user.role.toUpperCase() as UserRole)) {
        res.status(403).json({ message: "Acesso negado." });
        return; // Interrompe o fluxo após o envio da resposta
      }

      next(); // Prossegue se o role estiver correto
    };
  }

  // Logout
  async handleLogout(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Em produção, usa HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Controla o comportamento do cookie
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