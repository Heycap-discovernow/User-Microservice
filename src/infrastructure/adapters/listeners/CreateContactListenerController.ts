import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { ContactService } from "src/application/services/ContactService";
import { ContactDTO } from "src/domain/dtos/ContactDTO";

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