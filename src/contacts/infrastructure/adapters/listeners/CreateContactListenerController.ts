import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { ContactService } from "src/contacts/application/services/ContactService";
import { ContactDTO } from "src/contacts/domain/dtos/ContactDTO";

@Controller()
export class CreateContactListenerController {
    constructor(
        private readonly contactService: ContactService
    ){}

    @MessagePattern('create-contact')
    public async createContact(@Payload() contact: ContactDTO) {
        return await this.contactService.createContact(contact);
    }
}