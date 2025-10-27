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
    standardHeaders: true,
    legacyHeaders: false,
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
      return;  // Interrompe a execução aqui se houver erro
    }

    next(); // Se os dados estiverem ok, passa para o próximo middleware
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
      return;  // Interrompe a execução aqui se houver erro
    }

    next();
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
        return;  // Interrompe a execução aqui se não houver token
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      // Verificação de token adicional
      if (!decoded || !decoded.id || !decoded.role) {
        res.status(401).json({
          status: false,
          code: 401,
          message: "Token inválido ou incompleto",
          data: null,
        });
        return;  // Interrompe a execução aqui se o token for inválido
      }

      req.user = decoded; // Adiciona o usuário ao request
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

  // Autorização por roles
  authorizeRoles(...roles: UserRole[]) {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: "Token não fornecido." });
      }

      // Verificação de role em maiúsculas
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
