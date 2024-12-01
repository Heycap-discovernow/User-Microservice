import { Controller, Inject } from "@nestjs/common";
import { MessagePattern, Payload, ClientProxy } from "@nestjs/microservices";

import { TRANSPORT } from "src/config";

import { UserManagementService } from "src/users/application/services/UserManagementService";

@Controller()
export class EmailForgotPasswordListener {
    constructor(
        private readonly userService: UserManagementService,
        @Inject(TRANSPORT) private readonly client: ClientProxy
    ) { }

    @MessagePattern('email-to-forgot-password')
    public async searchEmailPassword(@Payload() email: string) {
        try {
            return await this.userService.forgotPassword(email, this.client);
        } catch (error) {
            return error;
        }
    }
}