import { SearchCodeUseCase } from "src/contacts/domain/ports/in/SearchCodeUseCase";
import { ContactRepository } from "src/contacts/domain/ports/out/ContactRepository";
export declare class SearchCodeUseCaseImpl implements SearchCodeUseCase {
    private readonly contactRepository;
    constructor(contactRepository: ContactRepository);
    searchCode(contact_uuid: string, type: string): Promise<string>;
}
