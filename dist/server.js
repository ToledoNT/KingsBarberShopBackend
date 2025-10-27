"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_route_1 = __importDefault(require("./router/user-route"));
const profissional_route_1 = __importDefault(require("./router/profissional-route"));
const agendamentos_admin_route_1 = __importDefault(require("./router/agendamentos-admin-route"));
const procedimentos_route_1 = __importDefault(require("./router/procedimentos-route"));
const horario_router_1 = __importDefault(require("./router/horario-router"));
const financeiro_route_1 = __importDefault(require("./router/financeiro-route"));
const dashboard_route_1 = __importDefault(require("./router/dashboard-route"));
const status_route_1 = __importDefault(require("./router/status-route"));
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, cookie_parser_1.default)());
server.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
server.use("/api", user_route_1.default);
server.use("/api", profissional_route_1.default);
server.use("/api", agendamentos_admin_route_1.default);
server.use("/api", procedimentos_route_1.default);
server.use("/api", horario_router_1.default);
server.use("/api", financeiro_route_1.default);
server.use("/api", dashboard_route_1.default);
server.use("/api", status_route_1.default);
server.get("/", (req, res) => {
    res.send("🔥 Servidor rodando e rotas carregadas!");
});
exports.default = server;
