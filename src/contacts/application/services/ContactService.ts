import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { validateOrReject } from "class-validator";
import { Builder } from "builder-pattern";

import { TRANSPORT } from "src/config";

import { ContactRequestDTO } from "src/contacts/application/dtos/ContactRequestDTO";
import { NotificationFactory } from "src/contacts/application/factory/NotificationFactory";

import { CreateContactUseCase } from "src/contacts/domain/ports/in/CreateContactUseCase";
import { SearchContactUseCase } from "src/contacts/domain/ports/in/SearchContactUseCase";
import { Contact } from "src/contacts/domain/models/Contact";


@Injectable()
export class ContactService implements CreateContactUseCase {
    constructor(
        @Inject("CreateContactUseCase") private readonly createContactUseCase: CreateContactUseCase,
        @Inject("SearchContactUseCase") private readonly searchContactUseCase: SearchContactUseCase,
        @Inject(TRANSPORT) private readonly client: ClientProxy
    ) { }

    public async createContact(data: ContactRequestDTO): Promise<string> {
        const search = await this.searchContact(data.phone).catch(() => { return null });
        if (search !== null) {
            return "Contact already exists";
        }
        const contact = new Contact(data.name, data.last_name, data.email, data.phone);
        await validateOrReject(contact);
        const result = await this.createContactUseCase.createContact(contact);
        let builder: NotificationFactory;
        if (data.channel == 'email') {
            builder = Builder(NotificationFactory)
                .client(this.client)
                .channel(data.channel)
                .destination(contact.email)
                .subject("Welcome to our platform")
                .message('Welcome to our platform, we are glad to have you here, please complete your register process in the module users to use all the features, your code is: ' + contact.code)
                .contact_uuid(contact.uuid)
                .type('confirmation')
                .build()
        } else {
            builder = Builder(NotificationFactory)
                .client(this.client)
                .channel(data.channel)
                .destination(contact.phone)
                .message(contact.code)
                .contact_uuid(contact.uuid)
                .type('confirmation')
                .build()
        }

        builder.getNotification().send()
        return result;
    }

    public async verifyPhone(code: string, contact_uuid: string): Promise<string> {
        const contact = await this.searchContact(contact_uuid);
        if (contact.code != code) {
            return "Invalid code";
        }
        //chance tengas que agregar un enum como value object que indique si el telefono esta verificado o no
        return "Phone verified";
    }

    public async searchContact(phone: string): Promise<Contact> {
        return await this.searchContactUseCase.searchContact(phone);
    }
}