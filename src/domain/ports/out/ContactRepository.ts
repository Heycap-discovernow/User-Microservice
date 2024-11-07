import { ContactDTO } from "src/domain/dtos/ContactDTO";

export interface ContactRepository {
    createContact(contact: ContactDTO): Promise<string>;
    searchContact(contact_uuid: string): Promise<ContactDTO>;
}