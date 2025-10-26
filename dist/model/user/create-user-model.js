"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserModel = void 0;
class CreateUserModel {
    constructor(data) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role ?? "BARBEIRO";
    }
    toPayload() {
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
        };
    }
}
exports.CreateUserModel = CreateUserModel;
