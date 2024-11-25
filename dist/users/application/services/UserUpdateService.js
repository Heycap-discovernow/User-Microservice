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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const bcrypt_1 = require("bcrypt");
const UserSearchService_1 = require("./UserSearchService");
let UserUpdateService = class UserUpdateService {
    constructor(updateUserUseCase, userSearchService) {
        this.updateUserUseCase = updateUserUseCase;
        this.userSearchService = userSearchService;
    }
    async updateUser(uuid, user) {
        if (user.nickname !== undefined) {
            const existingUser = await this.userSearchService.getByNickname(user.nickname);
            if (existingUser && existingUser.uuid !== uuid) {
                throw new microservices_1.RpcException('Email already registered');
            }
        }
        if (user.email !== undefined) {
            const existingUser = await this.userSearchService.getByEmail(user.email);
            if (existingUser && existingUser.uuid !== uuid) {
                throw new microservices_1.RpcException('Email already registered');
            }
        }
        if (user.phone !== undefined) {
            const existingUser = await this.userSearchService.getByPhone(user.phone);
            if (existingUser && existingUser.uuid !== uuid) {
                throw new microservices_1.RpcException('Phone already registered');
            }
        }
        return await this.updateUserUseCase.updateUser(uuid, user);
    }
    async changePassword(uuid, newPassword) {
        const user = await this.userSearchService.getById(uuid);
        const comparePassword = await (0, bcrypt_1.compare)(newPassword, user.password);
        if (comparePassword) {
            throw new microservices_1.RpcException("The new password not can be the same as the old password");
        }
        const hashedPassword = await (0, bcrypt_1.hash)(newPassword, 10);
        return await this.updateUser(uuid, { password: hashedPassword });
    }
};
exports.UserUpdateService = UserUpdateService;
exports.UserUpdateService = UserUpdateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UpdateUserUseCase')),
    __metadata("design:paramtypes", [Object, UserSearchService_1.UserSearchService])
], UserUpdateService);
//# sourceMappingURL=UserUpdateService.js.map