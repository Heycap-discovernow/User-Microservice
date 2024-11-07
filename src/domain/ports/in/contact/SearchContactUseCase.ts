import { ContactDTO } from "src/domain/dtos/ContactDTO";

export interface SearchContactUseCase {
    searchContact(contact_uuid: string): Promise<ContactDTO>;
}