"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./router/user-route"));
const profissional_route_1 = __importDefault(require("./router/profissional-route"));
const agendamentos_admin_route_1 = __importDefault(require("./router/agendamentos-admin-route"));
const procedimentos_route_1 = __importDefault(require("./router/procedimentos-route"));
const horario_router_1 = __importDefault(require("./router/horario-router"));
const financeiro_route_1 = __importDefault(require("./router/financeiro-route"));
const dashboard_route_1 = __importDefault(require("./router/dashboard-route"));
const status_route_1 = __importDefault(require("./router/status-route"));
const server = (0, express_1.default)();
const allowedOrigins = [
    "https://www.kingsbarber.com.br",
    "https://kingsbarber.com.br",
    "http://localhost:3000",
    "http://192.168.18.129:3000"
];
server.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Origem não permitida pelo CORS"));
        }
    },
    credentials: true,
}));
server.use(express_1.default.json());
server.use("/api", user_route_1.default);
server.use("/api", profissional_route_1.default);
server.use("/api", agendamentos_admin_route_1.default);
server.use("/api", procedimentos_route_1.default);
server.use("/api", horario_router_1.default);
server.use("/api", financeiro_route_1.default);
server.use("/api", dashboard_route_1.default);
server.use("/api", status_route_1.default);
server.get("/", (req, res) => {
    res.send("🔥 Servidor rodando e rotas carregadas com sucesso!");
});
exports.default = server;
