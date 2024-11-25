import { ContactRequestDTO } from "src/contacts/application/dtos/ContactRequestDTO";
import { NotificationFactory } from "src/contacts/application/factory/NotificationFactory";

import { CreateContactUseCase } from "src/contacts/domain/ports/in/CreateContactUseCase";
import { SearchContactUseCase } from "src/contacts/domain/ports/in/SearchContactUseCase";
import { Contact } from "src/contacts/domain/models/Contact";
import { ContactDTO } from "src/contacts/domain/dtos/ContactDTO";

import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { validateOrReject } from "class-validator";
import { Builder } from "builder-pattern";

@Injectable()
export class ContactService implements CreateContactUseCase {
    constructor(
        @Inject("CreateContactUseCase") private readonly createContactUseCase: CreateContactUseCase,
        @Inject("SearchContactUseCase") private readonly searchContactUseCase: SearchContactUseCase,
        @Inject("NOTIFICATIONS_TRANSPORT") private readonly client: ClientProxy
    ){}

    public async createContact(data: ContactRequestDTO): Promise<string> {
        const contact = new Contact(data.name, data.last_name, data.email, data.phone);
        await validateOrReject(contact);
        const result = await this.createContactUseCase.createContact(contact);
        const builder = Builder(NotificationFactory)
        .client(this.client)
        .type('email')
        .destination(contact.email)
        .subject("Welcome to our platform")
        .message('Welcome to our platform, we are glad to have you here, please complete your register process in the module users to use all the features')
        .contact_uuid(contact.uuid)
        .build()
        // this.client.emit('send-notification', "hola");
        builder.getNotification().send()
        return result;
    }

    public async searchContact(uuid: string): Promise<ContactDTO> {
        return await this.searchContactUseCase.searchContact(uuid);
    }
}