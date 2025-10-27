"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProfissionalUseCase = void 0;
const prisma_profissional_repository_1 = require("../../db/prisma/respositories/prisma-profissional-repository");
const create_log_1 = require("../logs/create-log");
class DeleteProfissionalUseCase {
    async execute(id) {
        const repository = new prisma_profissional_repository_1.PrismaProfessionalRepository();
        const deleteResult = await repository.deleteById(id);
        if (!deleteResult.status) {
            await new create_log_1.CreateLog().execute(deleteResult);
        }
        return deleteResult;
    }
}
exports.DeleteProfissionalUseCase = DeleteProfissionalUseCase;
