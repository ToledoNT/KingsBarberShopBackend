"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashbaord_controller_1 = require("../controller/dashboard/dashbaord-controller");
const user_middleware_1 = require("../middleware/user-middleware");
const router = express_1.default.Router();
const userMiddleware = new user_middleware_1.UserMiddleware();
const getDashboardController = new dashbaord_controller_1.GetDashboardMetricsController();
router.get("/dashboard/metrics", userMiddleware.handleAuth.bind(userMiddleware), userMiddleware.authorizeRoles("ADMIN"), getDashboardController.handle.bind(getDashboardController));
exports.default = router;
