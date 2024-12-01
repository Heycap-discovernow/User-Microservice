import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { ContactService } from "src/contacts/application/services/ContactService";

@Controller()
export class VerifyNumberListener {
    constructor(
        private readonly contactService: ContactService
    ) { }

    @MessagePattern('verify-number-register')
    public async verifyNumberListener(@Payload() payload: { code: string, phone: string, type: string}) {
        try {
            const { code, phone, type } = payload;
            return await this.contactService.verifyNumber(code, phone, type);
        } catch (error) {
            return error;
        }
    }
}