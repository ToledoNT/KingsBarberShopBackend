"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllFinanceiroController = void 0;
const get_all_financeiro_1 = require("../../use-case/financeiro/get-all-financeiro");
class GetAllFinanceiroController {
    async handle(req, res) {
        const result = await new get_all_financeiro_1.GetAllFinanceiroUseCase().execute();
        res.status(result.code).json(result);
    }
}
exports.GetAllFinanceiroController = GetAllFinanceiroController;
