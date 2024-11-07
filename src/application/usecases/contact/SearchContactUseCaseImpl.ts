import { ContactDTO } from "src/domain/dtos/ContactDTO";
import { SearchContactUseCase } from "src/domain/ports/in/contact/SearchContactUseCase";
import { ContactRepository } from "src/domain/ports/out/ContactRepository";

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