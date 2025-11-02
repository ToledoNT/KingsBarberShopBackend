import express from "express";
import { GetAllFinanceiroController } from "../controller/financeiro/get-all-financeiro";
import { UserMiddleware } from "../middleware/user-middleware";

const router = express.Router();
const userMiddleware = new UserMiddleware();
const getAllFinanceiroController = new GetAllFinanceiroController();

/* ============================
   ✅ GET ALL Financeiro (somente Admin)
   ============================ */
router.get(
  "/financeiro/getall",
  userMiddleware.handleAuth.bind(userMiddleware),      // verifica token JWT
  userMiddleware.authorizeRoles("ADMIN").bind(userMiddleware), // só Admin
  getAllFinanceiroController.handle.bind(getAllFinanceiroController)
);

export default router;