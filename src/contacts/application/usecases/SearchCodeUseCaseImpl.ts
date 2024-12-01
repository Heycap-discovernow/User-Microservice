import { Injectable, Inject } from "@nestjs/common";

import { SearchCodeUseCase } from "src/contacts/domain/ports/in/SearchCodeUseCase";
import { ContactRepository } from "src/contacts/domain/ports/out/ContactRepository";

@Injectable()
export class SearchCodeUseCaseImpl implements SearchCodeUseCase {
    constructor(
        @Inject('ContactRepository') private readonly contactRepository: ContactRepository
    ){}

    public async searchCode(contact_uuid: string, type: string): Promise<string> {
        return await this.contactRepository.searchCode(contact_uuid, type);
    }
}