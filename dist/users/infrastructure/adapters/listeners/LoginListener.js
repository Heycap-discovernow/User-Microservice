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
exports.LoginListener = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("../../../../config");
const UserManagementService_1 = require("../../../application/services/UserManagementService");
let LoginListener = class LoginListener {
    constructor(userService, client) {
        this.userService = userService;
        this.client = client;
    }
    async userLogin(payload) {
        const { email, password } = payload;
        return await this.userService.loginUser(email, password, this.client);
    }
};
exports.LoginListener = LoginListener;
__decorate([
    (0, microservices_1.MessagePattern)("user-login"),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginListener.prototype, "userLogin", null);
exports.LoginListener = LoginListener = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)(config_1.TRANSPORT)),
    __metadata("design:paramtypes", [UserManagementService_1.UserManagementService,
        microservices_1.ClientProxy])
], LoginListener);
//# sourceMappingURL=LoginListener.js.map