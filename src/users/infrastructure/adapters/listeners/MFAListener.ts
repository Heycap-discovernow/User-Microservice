import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UserManagementService } from "src/users/application/services/UserManagementService";

@Controller()
export class MFAListener {
    constructor(
        private readonly userService: UserManagementService
    ) { }

    @MessagePattern('verify-number-login')
    public async changePassword(@Payload() payload: { token: string, code: string }) { //Posiblemente ya no sea necesario este listener
        try {
            const { token, code } = payload;
            return await this.userService.mfaLogin(token, code);
        } catch (error) {
            return error;
        }
    }
}