import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ContactService } from "src/contacts/application/services/ContactService";

@Controller()
export class SearchContactListenerController {
    constructor(
        private readonly contactService: ContactService
    ){}

    @MessagePattern("search-contacts")
    public async searchContact(@Payload() contact_uuid: string) {
        return await this.contactService.searchContact(contact_uuid);
    }
}
