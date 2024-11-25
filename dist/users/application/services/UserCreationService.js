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
exports.UserCreationService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const ContactService_1 = require("../../../contacts/application/services/ContactService");
let UserCreationService = class UserCreationService {
    constructor(createUserUseCase, contactService) {
        this.createUserUseCase = createUserUseCase;
        this.contactService = contactService;
    }
    async createUser(data) {
        const contact = await this.contactService.searchContact(data.contact.phone);
        if (!contact) {
            throw new microservices_1.RpcException("Contact not found, please make sure of create the contact first");
        }
        const userParameter = {
            contact: contact,
            nickname: data.nickname,
            password: data.password,
            avatar: data.avatar
        };
        const result = await this.createUserUseCase.createUser(userParameter);
        if (!result) {
            throw new microservices_1.RpcException("User not created");
        }
        return result;
    }
};
exports.UserCreationService = UserCreationService;
exports.UserCreationService = UserCreationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CreateUserUseCase')),
    __metadata("design:paramtypes", [Object, ContactService_1.ContactService])
], UserCreationService);
//# sourceMappingURL=UserCreationService.js.map