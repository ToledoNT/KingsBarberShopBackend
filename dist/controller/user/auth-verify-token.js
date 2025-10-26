"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyTokenController = void 0;
class VerifyTokenController {
    handle(req, res, next) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    status: false,
                    code: 401,
                    message: "Token inválido ou expirado",
                    data: null,
                });
            }
            return res.status(200).json({
                status: true,
                code: 200,
                message: "Token válido",
                data: req.user,
            });
        }
        catch (err) {
            console.error("Erro ao verificar token:", err);
            return res.status(500).json({
                status: false,
                code: 500,
                message: "Erro interno ao verificar token",
                data: null,
            });
        }
    }
}
exports.VerifyTokenController = VerifyTokenController;
