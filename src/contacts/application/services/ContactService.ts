import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { validateOrReject } from "class-validator";
import { Builder } from "builder-pattern";

import { TRANSPORT } from "src/config";

import { ContactRequestDTO } from "src/contacts/application/dtos/ContactRequestDTO";
import { NotificationFactory } from "src/contacts/application/factory/NotificationFactory";
import { TokenService } from "src/users/application/services/TokenService";

import { CreateContactUseCase } from "src/contacts/domain/ports/in/CreateContactUseCase";
import { SearchContactUseCase } from "src/contacts/domain/ports/in/SearchContactUseCase";
import { CreateCodeUseCase } from "src/contacts/domain/ports/in/CreateCodeUseCase";
import { SearchCodeUseCase } from "src/contacts/domain/ports/in/SearchCodeUseCase";
import { Contact } from "src/contacts/domain/models/Contact";
import { lastValueFrom } from "rxjs";


@Injectable()
export class ContactService implements CreateContactUseCase, SearchContactUseCase, CreateCodeUseCase {
    constructor(
        @Inject("CreateContactUseCase") private readonly createContactUseCase: CreateContactUseCase,
        @Inject("SearchContactUseCase") private readonly searchContactUseCase: SearchContactUseCase,
        @Inject("CreateCodeUseCase") private readonly createCodeUseCase: CreateCodeUseCase,
        @Inject("SearchCodeUseCase") private readonly searchCodeUseCase: SearchCodeUseCase,
        @Inject(TRANSPORT) private readonly client: ClientProxy,
        private readonly tokenService: TokenService,
    ) { }

    public async createContact(data: ContactRequestDTO): Promise<string> {
        const search = await this.searchContact(data.phone).catch(() => { return null });
        if (search !== null) {
            return "Contact already exists";
        }
        const contact = new Contact(data.name, data.last_name, data.email, data.phone);
        await validateOrReject(contact);

        const result = await this.createContactUseCase.createContact(contact);

        const code = this.tokenService.generateCode();
        const codeToken = this.tokenService.generateCodeToken(contact.uuid, code);
        await this.createCode(contact.uuid, codeToken, 'REGISTER')

        let builder: NotificationFactory;
        switch(data.channel) {
            case 'email':
                builder = Builder(NotificationFactory)
                        .client(this.client)
                        .channel(data.channel)
                        .destination(contact.email)
                        .subject("Welcome to our platform")
                        .message('Welcome to our platform, we are glad to have you here, please complete your register process with your verification code: '.concat(code))
                        .contact_uuid(contact.uuid)
                        .type('confirmation')
                        .build()
            break;
            case 'whatsapp':
                builder = Builder(NotificationFactory)
                        .client(this.client)
                        .channel(data.channel)
                        .destination(contact.phone)
                        .message(code)
                        .contact_uuid(contact.uuid)
                        .type('confirmation')
                        .build()
            break;
            default:
                builder = Builder(NotificationFactory)
                        .client(this.client)
                        .channel(data.channel)
                        .destination(contact.phone)
                        .message(code)
                        .contact_uuid(contact.uuid)
                        .type('confirmation')
                        .build()
            break;
        }

        builder.getNotification().send()
        return result;
    }

    public async searchContact(phone: string): Promise<Contact> {
        return await this.searchContactUseCase.searchContact(phone);
    }

    public async verifyNumber(code: string, contact_phone: string, type: string): Promise<boolean> {
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

    public async createCode(contact_uuid: string, code: string, type: string): Promise<string> {
        return await this.createCodeUseCase.createCode(contact_uuid, code, type);
    }

    public async searchCode(contact_uuid: string, type: string): Promise<string> {
        return await this.searchCodeUseCase.searchCode(contact_uuid, type);
    }

}