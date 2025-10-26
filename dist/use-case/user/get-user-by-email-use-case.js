"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByEmailUseCase = void 0;
const prisma_user_repository_1 = require("../../db/prisma/respositories/prisma-user-repository");
const create_log_1 = require("../logs/create-log");
class GetUserByEmailUseCase {
    async execute(email) {
        const response = await new prisma_user_repository_1.PrismaUserRepository().getByEmail(email);
        if (!response.status) {
            await new create_log_1.CreateLog().execute(response);
        }
        return response;
    }
}
exports.GetUserByEmailUseCase = GetUserByEmailUseCase;
