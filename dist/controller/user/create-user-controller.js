"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const create_user_model_1 = require("../../model/user/create-user-model");
const create_use_case_1 = require("../../use-case/user/create-use-case");
class CreateUserController {
    async handle(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "The fields 'name', 'email' and 'password' are required.",
                data: []
            });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const payload = new create_user_model_1.CreateUserModel({
            name,
            email,
            password: hashedPassword
        }).toPayload();
        const createdUserResult = await new create_use_case_1.CreateUser().execute(payload);
        res.status(createdUserResult.code).json(createdUserResult);
    }
}
exports.CreateUserController = CreateUserController;
