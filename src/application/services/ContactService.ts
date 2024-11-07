import { ContactRequestDTO } from "src/application/dtos/request/ContactRequestDTO";

import { CreateContactUseCase } from "src/domain/ports/in/contact/CreateContactUseCase";
import { SearchContactUseCase } from "src/domain/ports/in/contact/SearchContactUseCase";
import { Contact } from "src/domain/models/Contact";
import { ContactDTO } from "src/domain/dtos/ContactDTO";

import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { validateOrReject } from "class-validator";

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
        // this.client.send("send-email", contact.email);
        this.client.emit('send-email', contact.email);
        console.log("Email sent");
        return result;
    }

    public async searchContact(uuid: string): Promise<ContactDTO> {
        return await this.searchContactUseCase.searchContact(uuid);
    }
}