import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

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
        message: `Campos obrigatórios faltando: ${missingFields.join(", ")}`,
        data: null,
      });
      return;
    }

    next();
  }

  // Valida login
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

// Autenticação JWT
async handleAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; 

    if (!token) {
      res.status(401).json({
        status: false,
        code: 401,
        message: "Token não fornecido",
        data: null,
      });
      return; // apenas return para sair da função, sem retornar o res
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

// --------------------------
// Middlewares de autorização
// --------------------------
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (decoded.role !== "ADMIN") { 
      return res.status(403).json({ message: "Acesso negado. Apenas administradores." });
    }

    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido." });
  }
};

export const authorizeBarbeiro = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (decoded.role !== "barbeiro" && decoded.role !== "admin") {
      return res.status(403).json({ message: "Acesso negado. Apenas barbeiros." });
    }

    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido." });
  }
};