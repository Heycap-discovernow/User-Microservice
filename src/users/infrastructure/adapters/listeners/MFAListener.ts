import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UserManagementService } from "src/users/application/services/UserManagementService";

@Controller()
export class MFAListener {
    constructor(
        private readonly userService: UserManagementService
    ) { }

    @MessagePattern('verify-number-login')
    public async changePassword(@Payload() payload: { code: string, user_uuid: string, type: string }) { //Posiblemente ya no sea necesario este listener
        try {
            const { code, user_uuid, type } = payload;
            return await this.userService.mfaLogin(code, user_uuid, type);
        } catch (error) {
            return error;
        }
    }
}