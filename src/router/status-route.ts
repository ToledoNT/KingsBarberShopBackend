import express, { type RequestHandler, type Request, type Response } from "express";
import { UserMiddleware } from "../middleware/user-middleware";

const userMiddleware = new UserMiddleware();
const router = express.Router();

/* ============================
   ✅ STATUS DA APLICAÇÃO
   ============================ */
router.get(
  "/status",
  (req: Request, res: Response) => {
    res.status(200).json({
      status: true,
      code: 200,
      message: "Servidor online e funcionando!",
      timestamp: new Date().toISOString(),
    });
  }
);

export default router;