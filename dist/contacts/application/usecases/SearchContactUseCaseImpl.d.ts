import { Contact } from "src/contacts/domain/models/Contact";
import { SearchContactUseCase } from "src/contacts/domain/ports/in/SearchContactUseCase";
import { ContactRepository } from "src/contacts/domain/ports/out/ContactRepository";
export declare class SearchContactUseCaseImpl implements SearchContactUseCase {
    private readonly contactRepository;
    constructor(contactRepository: ContactRepository);
    searchContact(contact_uuid: string): Promise<Contact>;
}
