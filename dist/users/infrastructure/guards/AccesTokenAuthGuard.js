"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenAuthGuard = void 0;
const index_1 = require("../../../config/index");
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let AccessTokenAuthGuard = class AccessTokenAuthGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const accessToken = request.headers.authorization?.split(" ")[1];
        if (!accessToken) {
            throw new common_1.UnauthorizedException('Access token missing');
        }
        try {
            jwt.verify(accessToken, index_1.JWT_KEY);
            return true;
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid access token');
        }
    }
};
exports.AccessTokenAuthGuard = AccessTokenAuthGuard;
exports.AccessTokenAuthGuard = AccessTokenAuthGuard = __decorate([
    (0, common_1.Injectable)()
], AccessTokenAuthGuard);
//# sourceMappingURL=AccesTokenAuthGuard.js.map