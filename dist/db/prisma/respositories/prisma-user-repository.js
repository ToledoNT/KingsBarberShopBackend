"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const prisma_connection_1 = require("../prisma-connection");
const response_templete_model_1 = require("../../../model/response-templete-model");
class PrismaUserRepository {
    async create(data) {
        try {
            const user = await prisma_connection_1.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                },
            });
            return new response_templete_model_1.ResponseTemplateModel(true, 201, "Usuário criado com sucesso", user);
        }
        catch (error) {
            console.error("Erro ao criar usuário:", error);
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                return new response_templete_model_1.ResponseTemplateModel(false, 409, "E-mail já está em uso", []);
            }
            return new response_templete_model_1.ResponseTemplateModel(false, 500, "Erro interno ao criar usuário", []);
        }
    }
    async getByEmail(email) {
        try {
            const user = await prisma_connection_1.prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                return new response_templete_model_1.ResponseTemplateModel(false, 404, "Usuário não encontrado", []);
            }
            return new response_templete_model_1.ResponseTemplateModel(true, 200, "Usuário encontrado com sucesso", user);
        }
        catch (error) {
            console.error("Erro ao buscar usuário:", error);
            return new response_templete_model_1.ResponseTemplateModel(false, 500, "Erro interno ao buscar usuário", []);
        }
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
