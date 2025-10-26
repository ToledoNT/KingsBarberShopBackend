"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProcedimentosController = void 0;
const get_all_procedimentos_1 = require("../../use-case/procedimento/get-all-procedimentos");
class GetAllProcedimentosController {
    async handle(req, res) {
        const allProcedimentosResult = await new get_all_procedimentos_1.GetAllProcedimentosUseCase().execute();
        res.status(allProcedimentosResult.code).json(allProcedimentosResult);
    }
}
exports.GetAllProcedimentosController = GetAllProcedimentosController;
