import express from "express";
import { GetDashboardMetricsController } from "../controller/dashboard/dashbaord-controller";

const router = express.Router();

const getAllRelatorioController = new GetDashboardMetricsController();

/* ============================
   ✅ GET ALL Relatórios
   ============================ */
router.get(
  "/dashboard/metrics",
  getAllRelatorioController.handle.bind(getAllRelatorioController)
);

export default router;