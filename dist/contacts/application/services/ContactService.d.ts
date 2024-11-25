import { ClientProxy } from "@nestjs/microservices";
import { ContactRequestDTO } from "src/contacts/application/dtos/ContactRequestDTO";
import { CreateContactUseCase } from "src/contacts/domain/ports/in/CreateContactUseCase";
import { SearchContactUseCase } from "src/contacts/domain/ports/in/SearchContactUseCase";
import { Contact } from "src/contacts/domain/models/Contact";
export declare class ContactService implements CreateContactUseCase {
    private readonly createContactUseCase;
    private readonly searchContactUseCase;
    private readonly client;
    constructor(createContactUseCase: CreateContactUseCase, searchContactUseCase: SearchContactUseCase, client: ClientProxy);
    createContact(data: ContactRequestDTO): Promise<string>;
    verifyPhone(code: string, contact_uuid: string): Promise<string>;
    searchContact(phone: string): Promise<Contact>;
}
