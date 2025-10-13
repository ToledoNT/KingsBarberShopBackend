import type { Request, Response, NextFunction } from "express";

export class UserMiddleware {

  async handleCreateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, email, password } = req.body;

    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
      res.status(400).json({
        code: 400,
        message: `Os seguintes campos obrigatórios estão faltando: ${missingFields.join(", ")}`,
      });
      return;
    }

    next();
  }
}