"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const prisma_user_repository_1 = require("../../db/prisma/respositories/prisma-user-repository");
const create_log_1 = require("../logs/create-log");
class CreateUser {
    async execute(conta) {
        const responseCreate = await new prisma_user_repository_1.PrismaUserRepository().create(conta);
        if (!responseCreate.status) {
            await new create_log_1.CreateLog().execute(responseCreate);
        }
        return responseCreate;
    }
}
exports.CreateUser = CreateUser;
