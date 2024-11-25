import { ContactDTO } from "src/contacts/domain/dtos/ContactDTO";
import { SearchContactUseCase } from "src/contacts/domain/ports/in/SearchContactUseCase";
import { ContactRepository } from "src/contacts/domain/ports/out/ContactRepository";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class SearchContactUseCaseImpl implements SearchContactUseCase {
    constructor(
        @Inject('ContactRepository') private readonly contactRepository: ContactRepository
    ){}

    public async searchContact(contact_uuid: string): Promise<ContactDTO> {
        return await this.contactRepository.searchContact(contact_uuid);
    }
}