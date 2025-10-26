"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserMiddleware {
    async handleCreateUser(req, res, next) {
        const { name, email, password } = req.body;
        const missingFields = [];
        if (!name)
            missingFields.push("name");
        if (!email)
            missingFields.push("email");
        if (!password)
            missingFields.push("password");
        if (missingFields.length > 0) {
            res.status(400).json({
                status: false,
                code: 400,
                message: `Campos obrigatórios faltando: ${missingFields.join(", ")}`,
                data: null,
            });
            return;
        }
        next();
    }
    async handleLogin(req, res, next) {
        const { email, password } = req.body;
        const missingFields = [];
        if (!email)
            missingFields.push("email");
        if (!password)
            missingFields.push("password");
        if (missingFields.length > 0) {
            res.status(400).json({
                status: false,
                code: 400,
                message: `Campos obrigatórios faltando: ${missingFields.join(", ")}`,
                data: null,
            });
            return;
        }
        next();
    }
    async handleAuth(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader?.split(' ')[1];
            if (!token) {
                res.status(401).json({
                    status: false,
                    code: 401,
                    message: "Token não fornecido",
                    data: null,
                });
                return;
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        }
        catch (err) {
            console.error("JWT inválido:", err);
            res.status(401).json({
                status: false,
                code: 401,
                message: "Token inválido ou expirado",
                data: null,
            });
        }
    }
    authorizeRoles(...roles) {
        return (req, res, next) => {
            const user = req.user;
            if (!user) {
                return res.status(401).json({ message: "Token não fornecido." });
            }
            if (!roles.includes(user.role.toUpperCase())) {
                return res.status(403).json({ message: "Acesso negado." });
            }
            next();
        };
    }
    async handleLogout(req, res, next) {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
        });
        res.status(200).json({
            status: true,
            code: 200,
            message: "Logout realizado com sucesso",
            data: null,
        });
    }
}
exports.UserMiddleware = UserMiddleware;
