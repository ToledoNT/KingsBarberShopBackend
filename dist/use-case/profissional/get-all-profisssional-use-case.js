"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProfessionalsUseCase = void 0;
const prisma_profissional_repository_1 = require("../../db/prisma/respositories/prisma-profissional-repository");
const create_log_1 = require("../logs/create-log");
class GetAllProfessionalsUseCase {
    async execute() {
        const repository = new prisma_profissional_repository_1.PrismaProfessionalRepository();
        const responseGetAll = await repository.getAll();
        if (!responseGetAll.status) {
            await new create_log_1.CreateLog().execute(responseGetAll);
        }
        return responseGetAll;
    }
}
exports.GetAllProfessionalsUseCase = GetAllProfessionalsUseCase;
