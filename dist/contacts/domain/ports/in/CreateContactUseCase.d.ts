import { ContactDTO } from "src/contacts/domain/dtos/ContactDTO";
export interface CreateContactUseCase {
    createContact(contact: ContactDTO): Promise<string>;
}
