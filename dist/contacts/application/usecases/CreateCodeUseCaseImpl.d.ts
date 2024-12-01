import { CreateCodeUseCase } from "src/contacts/domain/ports/in/CreateCodeUseCase";
import { ContactRepository } from "src/contacts/domain/ports/out/ContactRepository";
export declare class CreateCodeUseCaseImpl implements CreateCodeUseCase {
    private readonly contactRepository;
    constructor(contactRepository: ContactRepository);
    createCode(contact_uuid: string, code: string, type: string): Promise<string>;
}
