import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UserManagementService } from "src/users/application/services/UserManagementService";

@Controller()
export class EmailForgotPasswordListener {
    constructor(
        private readonly userService: UserManagementService
    ) { }

    @MessagePattern('email-to-forgot-password')
    public async searchEmailPassword(@Payload() email: string) {
        try {
            return await this.userService.forgotPassword(email);
        } catch (error) {
            return error;
        }
    }
}