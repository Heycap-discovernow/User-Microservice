"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../../config");
let TokenService = class TokenService {
    constructor() { }
    generateJwtLogin(user, code) {
        const token = (0, jsonwebtoken_1.sign)({
            uuid: user.uuid,
            email: user.email,
            phone: user.phone,
            fullname: user.name.concat(' ', user.last_name),
            nickname: user.nickname,
            avatar: user.avatar,
            mfa_code: code
        }, config_1.JWT_KEY, { expiresIn: '1h' });
        return token;
    }
    generateJwtForgotPassword(user, code) {
        const token = (0, jsonwebtoken_1.sign)({
            uuid: user.uuid,
            email: user.email,
            code: code
        }, config_1.JWT_KEY, { expiresIn: '1m' });
        return token;
    }
    decodeJwt(token) {
        return (0, jsonwebtoken_1.verify)(token, config_1.JWT_KEY);
    }
    generateCode() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TokenService);
//# sourceMappingURL=TokenService.js.map