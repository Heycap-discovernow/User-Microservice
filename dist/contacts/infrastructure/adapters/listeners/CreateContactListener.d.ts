import { ContactService } from "src/contacts/application/services/ContactService";
import { ContactRequestDTO } from "src/contacts/application/dtos/ContactRequestDTO";
export declare class CreateContactListener {
    private readonly contactService;
    constructor(contactService: ContactService);
    createContact(contact: ContactRequestDTO): Promise<string>;
}
