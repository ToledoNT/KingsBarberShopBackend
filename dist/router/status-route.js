"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_middleware_1 = require("../middleware/user-middleware");
const userMiddleware = new user_middleware_1.UserMiddleware();
const router = express_1.default.Router();
router.get("/status", (req, res) => {
    res.status(200).json({
        status: true,
        code: 200,
        message: "Servidor online e funcionando!",
        timestamp: new Date().toISOString(),
    });
});
exports.default = router;
