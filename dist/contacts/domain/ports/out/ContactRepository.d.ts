import { ContactDTO } from "src/contacts/domain/dtos/ContactDTO";
import { CodeDTO } from "src/contacts/domain/dtos/CodeDTO";
import { Contact } from "src/contacts/domain/models/Contact";
export interface ContactRepository {
    createContact(contact: ContactDTO): Promise<string>;
    searchContact(phone: string): Promise<Contact>;
    createCode(code: CodeDTO): Promise<string>;
    searchCode(contact_uuid: string, type: string): Promise<string>;
}
