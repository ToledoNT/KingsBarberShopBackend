"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfissionalUseCase = void 0;
const prisma_profissional_repository_1 = require("../../db/prisma/respositories/prisma-profissional-repository");
const create_log_1 = require("../logs/create-log");
class UpdateProfissionalUseCase {
    async execute(data) {
        const responseUpdate = await new prisma_profissional_repository_1.PrismaProfessionalRepository().update(data);
        if (!responseUpdate.status) {
            await new create_log_1.CreateLog().execute(responseUpdate);
        }
        return responseUpdate;
    }
}
exports.UpdateProfissionalUseCase = UpdateProfissionalUseCase;
