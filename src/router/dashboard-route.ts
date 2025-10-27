import express from "express";
import { GetDashboardMetricsController } from "../controller/dashboard/dashbaord-controller";
import { UserMiddleware } from "../middleware/user-middleware";
import { UserRole } from "../interface/user/create-user-interface";

const router = express.Router();
const userMiddleware = new UserMiddleware();
const getDashboardController = new GetDashboardMetricsController();

// Somente ADMIN pode acessar
router.get(
  "/dashboard/metrics",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles("ADMIN" as UserRole), 
  getDashboardController.handle.bind(getDashboardController)
);

export default router;