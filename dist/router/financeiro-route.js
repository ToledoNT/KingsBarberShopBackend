"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const get_all_financiero_1 = require("../controller/financeiro/get-all-financiero");
const user_middleware_1 = require("../middleware/user-middleware");
const router = express_1.default.Router();
const userMiddleware = new user_middleware_1.UserMiddleware();
const getAllFinanceiroController = new get_all_financiero_1.GetAllFinanceiroController();
router.get("/financeiro/getall", userMiddleware.handleAuth.bind(userMiddleware), userMiddleware.authorizeRoles("ADMIN").bind(userMiddleware), getAllFinanceiroController.handle.bind(getAllFinanceiroController));
exports.default = router;
