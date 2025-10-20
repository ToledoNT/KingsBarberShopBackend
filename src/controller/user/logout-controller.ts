// backend/controller/user/logout-controller.ts
import { Request, Response } from "express";

export const logoutController = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.status(200).json({
    status: true,
    code: 200,
    message: "Logout realizado com sucesso",
    data: null,
  });
};