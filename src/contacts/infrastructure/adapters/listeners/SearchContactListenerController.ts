import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ContactService } from "src/contacts/application/services/ContactService";

@Controller()
export class SearchContactListenerController {
    constructor(
        private readonly contactService: ContactService
    ){}

    @MessagePattern("search-contact")
    public async searchContact(@Payload() phone: string) {
        return await this.contactService.searchContact(phone);
    }
}
