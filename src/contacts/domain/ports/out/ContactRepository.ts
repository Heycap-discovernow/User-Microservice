import { ContactDTO } from "src/contacts/domain/dtos/ContactDTO";
import { Contact } from "src/contacts/domain/models/Contact";

export interface ContactRepository {
    createContact(contact: ContactDTO): Promise<string>;
    searchContact(phone: string): Promise<Contact>;
}