"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRepositoryAdapter = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const client_1 = require("@prisma/client");
const Contact_1 = require("../../../domain/models/Contact");
let ContactRepositoryAdapter = class ContactRepositoryAdapter extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async createContact(contactData) {
        const newContact = await this.contact.create({
            data: contactData
        });
        if (!newContact) {
            throw new microservices_1.RpcException('Something wrong happened to create your contact, please verify your info');
        }
        return "contact_uuid: " + newContact.uuid;
    }
    async searchContact(phone) {
        const contactFound = await this.contact.findUnique({
            where: {
                phone: phone
            }
        });
        if (!contactFound) {
            throw new microservices_1.RpcException('Contact not found');
        }
        const contact = new Contact_1.Contact(contactFound.name, contactFound.last_name, contactFound.email, contactFound.phone);
        contact.uuid = contactFound.uuid;
        return contact;
    }
    async createCode(code) {
        const existingCode = await this.code.findFirst({
            where: {
                contact_uuid: code.contact_uuid,
                type: code.type
            }
        });
        if (existingCode) {
            const updatedCode = await this.code.update({
                where: {
                    id: existingCode.id
                },
                data: {
                    code: code.code,
                    expires_at: code.expires_at,
                    created_at: code.created_at
                }
            });
            if (!updatedCode) {
                throw new microservices_1.RpcException("Code not updated");
            }
            return "Code updated successfully";
        }
        else {
            const saveCode = await this.code.create({
                data: code
            });
            if (!saveCode) {
                throw new microservices_1.RpcException("Code not created");
            }
            return "Code created successfully";
        }
    }
    async searchCode(contact_uuid, type) {
        const codeFound = await this.code.findFirst({
            where: {
                contact_uuid: contact_uuid,
                AND: {
                    type: type
                }
            }
        });
        if (!codeFound) {
            throw new microservices_1.RpcException("Code not found");
        }
        return codeFound.code;
    }
};
exports.ContactRepositoryAdapter = ContactRepositoryAdapter;
exports.ContactRepositoryAdapter = ContactRepositoryAdapter = __decorate([
    (0, common_1.Injectable)()
], ContactRepositoryAdapter);
//# sourceMappingURL=ContactRepositoryAdapter.js.map