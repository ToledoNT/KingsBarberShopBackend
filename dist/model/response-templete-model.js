"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseTemplateModel = void 0;
class ResponseTemplateModel {
    constructor(status, code, message, data) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
exports.ResponseTemplateModel = ResponseTemplateModel;
