"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = void 0;
const logoutController = (req, res) => {
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
exports.logoutController = logoutController;
