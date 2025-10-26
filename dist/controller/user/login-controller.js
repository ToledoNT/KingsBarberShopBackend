"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const get_user_by_email_use_case_1 = require("../../use-case/user/get-user-by-email-use-case");
class LoginUserController {
    async handle(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({
                    status: false,
                    code: 400,
                    message: "Os campos 'email' e 'password' são obrigatórios.",
                    data: null,
                });
                return;
            }
            const userResult = await new get_user_by_email_use_case_1.GetUserByEmailUseCase().execute(email);
            if (!userResult.status || !userResult.data) {
                res.status(401).json({
                    status: false,
                    code: 401,
                    message: "Usuário ou senha inválidos.",
                    data: null,
                });
                return;
            }
            const user = userResult.data;
            const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
            if (!passwordMatch) {
                res.status(401).json({
                    status: false,
                    code: 401,
                    message: "Usuário ou senha inválidos.",
                    data: null,
                });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d", algorithm: "HS256" });
            if (process.env.NODE_ENV === "production") {
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 24 * 60 * 60 * 1000,
                    path: "/",
                });
            }
            res.status(200).json({
                status: true,
                code: 200,
                message: "Login realizado com sucesso.",
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token,
                },
            });
        }
        catch {
            res.status(500).json({
                status: false,
                code: 500,
                message: "Erro interno ao realizar login.",
                data: null,
            });
        }
    }
}
exports.LoginUserController = LoginUserController;
