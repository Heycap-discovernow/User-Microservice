import { ContactDTO } from "src/contacts/domain/dtos/ContactDTO";
import { CreateContactUseCase } from "src/contacts/domain/ports/in/CreateContactUseCase";
import { ContactRepository } from "src/contacts/domain/ports/out/ContactRepository";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class CreateContactUseCaseImpl implements CreateContactUseCase {
    constructor(
        @Inject("ContactRepository") private readonly contactRepository: ContactRepository
    ){}

    public async createContact(contact: ContactDTO): Promise<string> {
        return await this.contactRepository.createContact(contact);
    }
}