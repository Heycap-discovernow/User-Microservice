import { ContactDTO } from "src/domain/dtos/ContactDTO";

export interface CreateContactUseCase {
    createContact(contact: ContactDTO): Promise<string>;
}