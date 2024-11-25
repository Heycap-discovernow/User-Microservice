import { ContactDTO } from "src/contacts/domain/dtos/ContactDTO";

export interface SearchContactUseCase {
    searchContact(contact_uuid: string): Promise<ContactDTO>;
}