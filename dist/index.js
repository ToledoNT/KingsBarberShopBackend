"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./server"));
dotenv_1.default.config();
const PORT = Number(process.env.PORT) || 4001;
server_1.default.listen(PORT, "0.0.0.0", () => {
    console.clear();
    console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
