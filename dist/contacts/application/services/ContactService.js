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
const Contact_1 = require("../../domain/models/Contact");
let ContactService = class ContactService {
    constructor(createContactUseCase, searchContactUseCase, client) {
        this.createContactUseCase = createContactUseCase;
        this.searchContactUseCase = searchContactUseCase;
        this.client = client;
    }
    async createContact(data) {
        const search = await this.searchContact(data.phone).catch(() => { return null; });
        if (search !== null) {
            return "Contact already exists";
        }
        const contact = new Contact_1.Contact(data.name, data.last_name, data.email, data.phone);
        await (0, class_validator_1.validateOrReject)(contact);
        const result = await this.createContactUseCase.createContact(contact);
        let builder;
        if (data.channel == 'email') {
            builder = (0, builder_pattern_1.Builder)(NotificationFactory_1.NotificationFactory)
                .client(this.client)
                .channel(data.channel)
                .destination(contact.email)
                .subject("Welcome to our platform")
                .message('Welcome to our platform, we are glad to have you here, please complete your register process in the module users to use all the features, your code is: ' + contact.code)
                .contact_uuid(contact.uuid)
                .type('confirmation')
                .build();
        }
        else {
            builder = (0, builder_pattern_1.Builder)(NotificationFactory_1.NotificationFactory)
                .client(this.client)
                .channel(data.channel)
                .destination(contact.phone)
                .message(contact.code)
                .contact_uuid(contact.uuid)
                .type('confirmation')
                .build();
        }
        builder.getNotification().send();
        return result;
    }
    async verifyPhone(code, contact_uuid) {
        const contact = await this.searchContact(contact_uuid);
        if (contact.code != code) {
            return "Invalid code";
        }
        return "Phone verified";
    }
    async searchContact(phone) {
        return await this.searchContactUseCase.searchContact(phone);
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("CreateContactUseCase")),
    __param(1, (0, common_1.Inject)("SearchContactUseCase")),
    __param(2, (0, common_1.Inject)(config_1.TRANSPORT)),
    __metadata("design:paramtypes", [Object, Object, microservices_1.ClientProxy])
], ContactService);
//# sourceMappingURL=ContactService.js.map