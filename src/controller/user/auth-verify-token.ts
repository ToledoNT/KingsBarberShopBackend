import type { Request, Response } from "express";

export class VerifyTokenController {
  handle(req: Request, res: Response) {
    res.status(200).json({
      status: true,
      code: 200,
      message: "Token válido",
      data: (req as any).user, 
    });
  }
}