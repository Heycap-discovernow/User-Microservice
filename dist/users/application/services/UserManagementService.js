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
exports.UserManagementService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const builder_pattern_1 = require("builder-pattern");
const config_1 = require("../../../config");
const UserResponse_1 = require("../dtos/response/UserResponse");
const ForgotPasswordResponse_1 = require("../dtos/response/ForgotPasswordResponse");
const NotificationFactory_1 = require("../factory/NotificationFactory");
const UserSearchService_1 = require("./UserSearchService");
const UserCreationService_1 = require("./UserCreationService");
const UserUpdateService_1 = require("./UserUpdateService");
const UserLoginService_1 = require("./UserLoginService");
const UserDeletionService_1 = require("./UserDeletionService");
const TokenService_1 = require("./TokenService");
let UserManagementService = class UserManagementService {
    constructor(userSearchService, userCreationService, userUpdateService, userDeletionService, userLoginService, tokenService, client) {
        this.userSearchService = userSearchService;
        this.userCreationService = userCreationService;
        this.userUpdateService = userUpdateService;
        this.userDeletionService = userDeletionService;
        this.userLoginService = userLoginService;
        this.tokenService = tokenService;
        this.client = client;
    }
    async getUserById(uuid) {
        const user = await this.userSearchService.getById(uuid);
        const userResponse = new UserResponse_1.UserResponse(user.uuid, user.name, user.last_name, user.nickname, user.email, user.phone, user.avatar);
        return userResponse;
    }
    async getUserByEmail(email) {
        const user = await this.userSearchService.getByEmail(email);
        const userResponse = new UserResponse_1.UserResponse(user.uuid, user.name, user.last_name, user.nickname, user.email, user.phone, user.avatar);
        return userResponse;
    }
    async getUserByNickname(nickname) {
        const user = await this.userSearchService.getByNickname(nickname);
        const userResponse = new UserResponse_1.UserResponse(user.uuid, user.name, user.last_name, user.nickname, user.email, user.phone, user.avatar);
        return userResponse;
    }
    async getUserByPhone(phone) {
        const user = await this.userSearchService.getByPhone(phone);
        const userResponse = new UserResponse_1.UserResponse(user.uuid, user.name, user.last_name, user.nickname, user.email, user.phone, user.avatar);
        return userResponse;
    }
    async searchUsers(text) {
        const users = await this.userSearchService.searchUsers(text);
        const usersResponse = users.map(user => new UserResponse_1.UserResponse(user.uuid, user.name, user.last_name, user.nickname, user.email, user.phone, user.avatar));
        return usersResponse;
    }
    async createUser(data) {
        return await this.userCreationService.createUser(data);
    }
    async loginUser(email, password) {
        const user = await this.userLoginService.login(email, password);
        const code = this.tokenService.generateCode();
        const builder = {
            client: this.client,
            channel: "email",
            destination: user.email,
            subject: "Verification code to authorization of sign in",
            message: "Your verification code is: ".concat(code),
            contact_uuid: user.contact_uuid,
            type: 'authorization'
        };
        const sent = await this.sendCode(builder);
        if (!sent) {
            throw new microservices_1.RpcException("Error sending the verification code, please try again");
        }
        const token = this.tokenService.generateJwtLogin(user, code);
        return token;
    }
    async mfaLogin(token, code) {
        const payload = this.tokenService.decodeJwt(token);
        const uuid = payload.uuid;
        return await this.userLoginService.verifyPhone(uuid, code);
    }
    async updateUser(token, data) {
        const payload = this.tokenService.decodeJwt(token);
        const uuid = payload.uuid;
        return await this.userUpdateService.updateUser(uuid, data);
    }
    async changePassword(token, newPassword) {
        const payload = this.tokenService.decodeJwt(token);
        const uuid = payload.uuid;
        return await this.userUpdateService.changePassword(uuid, newPassword);
    }
    async forgotPassword(email) {
        const user = await this.userSearchService.getByEmail(email);
        if (!user) {
            throw new microservices_1.RpcException("Email not found, please try again");
        }
        const code = this.tokenService.generateCode();
        const builder = {
            client: this.client,
            channel: "email",
            destination: user.email,
            subject: "Verification code to change password",
            message: "Your verification code is: ".concat(code),
            contact_uuid: user.contact_uuid,
            type: 'confirmation'
        };
        const sent = await this.sendCode(builder);
        if (!sent) {
            throw new microservices_1.RpcException("Error sending the verification code, please try again");
        }
        const token = this.tokenService.generateJwtForgotPassword(user, code);
        return new ForgotPasswordResponse_1.ForgotPasswordResponse(token, "Please introduce the verification code that we sent to your email");
    }
    async deleteUser(token) {
        const payload = this.tokenService.decodeJwt(token);
        const uuid = payload.uuid;
        return await this.userDeletionService.deleteUser(uuid);
    }
    async sendCode(builder) {
        let notification;
        if (builder.channel == 'email') {
            notification = (0, builder_pattern_1.Builder)(NotificationFactory_1.NotificationFactory)
                .client(builder.client)
                .channel("email")
                .destination(builder.destination)
                .subject(builder.subject)
                .message(builder.message)
                .contact_uuid(builder.contact_uuid)
                .type(builder.type)
                .build();
            notification.getNotification().send();
        }
        else {
            notification = (0, builder_pattern_1.Builder)(NotificationFactory_1.NotificationFactory)
                .client(builder.client)
                .channel("whatsapp")
                .destination(builder.destination)
                .message(builder.message)
                .contact_uuid(builder.contact_uuid)
                .type(builder.type)
                .build();
            notification.getNotification().send();
        }
        return "Code sent";
    }
    async resendCodeForgotPass(email) {
        const result = await this.forgotPassword(email);
        if (!result) {
            throw new microservices_1.RpcException("Error to resend the code, please try again");
        }
        return new ForgotPasswordResponse_1.ForgotPasswordResponse(result.token, "Code resent".concat(" ", result.message));
    }
};
exports.UserManagementService = UserManagementService;
exports.UserManagementService = UserManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(6, (0, common_1.Inject)(config_1.TRANSPORT)),
    __metadata("design:paramtypes", [UserSearchService_1.UserSearchService,
        UserCreationService_1.UserCreationService,
        UserUpdateService_1.UserUpdateService,
        UserDeletionService_1.UserDeletionService,
        UserLoginService_1.UserLoginService,
        TokenService_1.TokenService,
        microservices_1.ClientProxy])
], UserManagementService);
//# sourceMappingURL=UserManagementService.js.map