import { Contact } from "src/contacts/domain/models/Contact";
import { SearchContactUseCase } from "src/contacts/domain/ports/in/SearchContactUseCase";
import { ContactRepository } from "src/contacts/domain/ports/out/ContactRepository";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class SearchContactUseCaseImpl implements SearchContactUseCase {
    constructor(
        @Inject('ContactRepository') private readonly contactRepository: ContactRepository
    ){}

    public async searchContact(contact_uuid: string): Promise<Contact> {
        return await this.contactRepository.searchContact(contact_uuid);
    }
}