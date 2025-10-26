"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProfessionalsController = void 0;
const get_all_profisssional_use_case_1 = require("../../use-case/profissional/get-all-profisssional-use-case");
class GetAllProfessionalsController {
    async handle(req, res) {
        const professionals = await new get_all_profisssional_use_case_1.GetAllProfessionalsUseCase().execute();
        res.status(professionals.code).json(professionals);
    }
}
exports.GetAllProfessionalsController = GetAllProfessionalsController;
