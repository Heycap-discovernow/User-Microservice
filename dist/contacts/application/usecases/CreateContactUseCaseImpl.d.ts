import { ContactDTO } from "src/contacts/domain/dtos/ContactDTO";
import { CreateContactUseCase } from "src/contacts/domain/ports/in/CreateContactUseCase";
import { ContactRepository } from "src/contacts/domain/ports/out/ContactRepository";
export declare class CreateContactUseCaseImpl implements CreateContactUseCase {
    private readonly contactRepository;
    constructor(contactRepository: ContactRepository);
    createContact(contact: ContactDTO): Promise<string>;
}
