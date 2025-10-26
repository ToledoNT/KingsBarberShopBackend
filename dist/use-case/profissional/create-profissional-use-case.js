"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProfissionalUseCase = void 0;
const prisma_profissional_repository_1 = require("../../db/prisma/respositories/prisma-profissional-repository");
const create_log_1 = require("../logs/create-log");
class CreateProfissionalUseCase {
    async execute(professional) {
        const responseCreate = await new prisma_profissional_repository_1.PrismaProfessionalRepository().create(professional);
        if (!responseCreate.status) {
            await new create_log_1.CreateLog().execute(responseCreate);
        }
        return responseCreate;
    }
}
exports.CreateProfissionalUseCase = CreateProfissionalUseCase;
