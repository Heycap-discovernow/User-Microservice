import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { ContactService } from "src/contacts/application/services/ContactService";
import { ContactRequestDTO } from "src/contacts/application/dtos/ContactRequestDTO";

@Controller()
export class CreateContactListener {
    constructor(
        private readonly contactService: ContactService
    ){}

    @MessagePattern('create-contact')
    public async createContact(@Payload() contact: ContactRequestDTO) {
        return await this.contactService.createContact(contact);
    }
}