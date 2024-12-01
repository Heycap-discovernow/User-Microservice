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
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const class_validator_1 = require("class-validator");
const builder_pattern_1 = require("builder-pattern");
const config_1 = require("../../../config");
const NotificationFactory_1 = require("../factory/NotificationFactory");
const TokenService_1 = require("../../../users/application/services/TokenService");
const Contact_1 = require("../../domain/models/Contact");
let ContactService = class ContactService {
    constructor(createContactUseCase, searchContactUseCase, createCodeUseCase, searchCodeUseCase, client, tokenService) {
        this.createContactUseCase = createContactUseCase;
        this.searchContactUseCase = searchContactUseCase;
        this.createCodeUseCase = createCodeUseCase;
        this.searchCodeUseCase = searchCodeUseCase;
        this.client = client;
        this.tokenService = tokenService;
    }
    async createContact(data) {
        const search = await this.searchContact(data.phone).catch(() => { return null; });
        if (search !== null) {
            return "Contact already exists";
        }
        const contact = new Contact_1.Contact(data.name, data.last_name, data.email, data.phone);
        await (0, class_validator_1.validateOrReject)(contact);
        const result = await this.createContactUseCase.createContact(contact);
        const code = this.tokenService.generateCode();
        const codeToken = this.tokenService.generateCodeToken(contact.uuid, code);
        await this.createCode(contact.uuid, codeToken, 'REGISTER');
        let builder;
        switch (data.channel) {
            case 'email':
                builder = (0, builder_pattern_1.Builder)(NotificationFactory_1.NotificationFactory)
                    .client(this.client)
                    .channel(data.channel)
                    .destination(contact.email)
                    .subject("Welcome to our platform")
                    .message('Welcome to our platform, we are glad to have you here, please complete your register process with your verification code: '.concat(code))
                    .contact_uuid(contact.uuid)
                    .type('confirmation')
                    .build();
                break;
            case 'whatsapp':
                builder = (0, builder_pattern_1.Builder)(NotificationFactory_1.NotificationFactory)
                    .client(this.client)
                    .channel(data.channel)
                    .destination(contact.phone)
                    .message(code)
                    .contact_uuid(contact.uuid)
                    .type('confirmation')
                    .build();
                break;
            default:
                builder = (0, builder_pattern_1.Builder)(NotificationFactory_1.NotificationFactory)
                    .client(this.client)
                    .channel(data.channel)
                    .destination(contact.phone)
                    .message(code)
                    .contact_uuid(contact.uuid)
                    .type('confirmation')
                    .build();
                break;
        }
        builder.getNotification().send();
        return result;
    }
    async searchContact(phone) {
        return await this.searchContactUseCase.searchContact(phone);
    }
    async verifyNumber(code, contact_phone, type) {
        const contact = await this.searchContact(contact_phone);
        const codeFound = await this.searchCode(contact.uuid, type);
        const codeDecoded = this.tokenService.decodeJwt(codeFound, contact.uuid);
        if (typeof codeDecoded === 'object' && 'code' in codeDecoded) {
            if (code === codeDecoded.code) {
                return true;
            }
        }
        return false;
    }
    async createCode(contact_uuid, code, type) {
        return await this.createCodeUseCase.createCode(contact_uuid, code, type);
    }
    async searchCode(contact_uuid, type) {
        return await this.searchCodeUseCase.searchCode(contact_uuid, type);
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("CreateContactUseCase")),
    __param(1, (0, common_1.Inject)("SearchContactUseCase")),
    __param(2, (0, common_1.Inject)("CreateCodeUseCase")),
    __param(3, (0, common_1.Inject)("SearchCodeUseCase")),
    __param(4, (0, common_1.Inject)(config_1.TRANSPORT)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, microservices_1.ClientProxy,
        TokenService_1.TokenService])
], ContactService);
//# sourceMappingURL=ContactService.js.map