import express from "express";
import { GetDashboardMetricsController } from "../controller/dashboard/dashbaord-controller";
import { UserMiddleware, authorizeAdmin, authorizeBarbeiro } from "../middleware/user-middleware";

const router = express.Router();
const userMiddleware = new UserMiddleware();
const getDashboardController = new GetDashboardMetricsController();

router.get(
  "/dashboard/metrics",
  userMiddleware.handleAuth.bind(userMiddleware), 
  authorizeAdmin,                                 
  getDashboardController.handle.bind(getDashboardController)
);

export default router;