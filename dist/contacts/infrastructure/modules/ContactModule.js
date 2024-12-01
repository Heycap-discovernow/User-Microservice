"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModule = void 0;
const common_1 = require("@nestjs/common");
const NotificationTransportModule_1 = require("../../../users/infrastructure/modules/NotificationTransportModule");
const ContactRepositoryAdapter_1 = require("../adapters/repositories/ContactRepositoryAdapter");
const CreateContactListener_1 = require("../adapters/listeners/CreateContactListener");
const VerifyNumberListener_1 = require("../adapters/listeners/VerifyNumberListener");
const ContactService_1 = require("../../application/services/ContactService");
const TokenService_1 = require("../../../users/application/services/TokenService");
const CreateContactUseCaseImpl_1 = require("../../application/usecases/CreateContactUseCaseImpl");
const SearchContactUseCaseImpl_1 = require("../../application/usecases/SearchContactUseCaseImpl");
const CreateCodeUseCaseImpl_1 = require("../../application/usecases/CreateCodeUseCaseImpl");
const SearchCodeUseCaseImpl_1 = require("../../application/usecases/SearchCodeUseCaseImpl");
let ContactModule = class ContactModule {
};
exports.ContactModule = ContactModule;
exports.ContactModule = ContactModule = __decorate([
    (0, common_1.Module)({
        imports: [NotificationTransportModule_1.NotificationTransportModule],
        controllers: [
            CreateContactListener_1.CreateContactListener,
            VerifyNumberListener_1.VerifyNumberListener
        ],
        providers: [
            ContactService_1.ContactService,
            TokenService_1.TokenService,
            {
                provide: "CreateContactUseCase",
                useClass: CreateContactUseCaseImpl_1.CreateContactUseCaseImpl
            },
            {
                provide: "SearchContactUseCase",
                useClass: SearchContactUseCaseImpl_1.SearchContactUseCaseImpl
            },
            {
                provide: "CreateCodeUseCase",
                useClass: CreateCodeUseCaseImpl_1.CreateCodeUseCaseImpl
            },
            {
                provide: "SearchCodeUseCase",
                useClass: SearchCodeUseCaseImpl_1.SearchCodeUseCaseImpl
            },
            {
                provide: "ContactRepository",
                useClass: ContactRepositoryAdapter_1.ContactRepositoryAdapter
            }
        ],
        exports: [ContactService_1.ContactService]
    })
], ContactModule);
//# sourceMappingURL=ContactModule.js.map