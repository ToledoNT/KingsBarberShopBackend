"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const server_1 = __importDefault(require("./server"));
const PORT = Number(process.env.PORT) || 4001;
if (process.env.NODE_ENV === "production") {
    const sslOptions = {
        key: fs_1.default.readFileSync(process.env.SSL_KEY),
        cert: fs_1.default.readFileSync(process.env.SSL_CERT),
        ca: process.env.SSL_CHAIN ? fs_1.default.readFileSync(process.env.SSL_CHAIN) : undefined,
    };
    https_1.default.createServer(sslOptions, server_1.default).listen(PORT, () => {
        console.log(`🔥 Servidor HTTPS rodando em https://seu-dominio:${PORT}`);
    });
}
else {
    server_1.default.listen(PORT, "0.0.0.0", () => {
        console.log(`🔥 Servidor HTTP rodando em http://localhost:${PORT}`);
    });
}
