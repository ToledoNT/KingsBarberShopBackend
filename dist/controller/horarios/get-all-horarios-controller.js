"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllHorariosController = void 0;
const get_all_horario_use_case_1 = require("../../use-case/horario/get-all-horario-use-case");
class GetAllHorariosController {
    async handle(req, res) {
        const result = await new get_all_horario_use_case_1.GetAllHorariosUseCase().execute();
        res.status(result.code).json(result);
    }
}
exports.GetAllHorariosController = GetAllHorariosController;
