import express from "express";
import { GetAllFinanceiroController } from "../controller/financeiro/get-all-financiero";

const router = express.Router();

const getAllFinanceiroController = new GetAllFinanceiroController();

/* ============================
   ✅ GET ALL Financeiro
   ============================ */
router.get(
  "/financeiro/getall",
  getAllFinanceiroController.handle.bind(getAllFinanceiroController)
);

export default router;