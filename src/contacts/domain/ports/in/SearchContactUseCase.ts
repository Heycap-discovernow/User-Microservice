import { ContactDTO } from "src/contacts/domain/dtos/ContactDTO";

export interface SearchContactUseCase {
    searchContact(phone: string): Promise<ContactDTO>;
}