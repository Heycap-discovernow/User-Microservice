import { Controller, Inject } from "@nestjs/common";
import { MessagePattern, Payload, ClientProxy } from "@nestjs/microservices";

import { TRANSPORT } from "src/config";

import { UserManagementService } from "src/users/application/services/UserManagementService";

@Controller()
export class ResendCodeListener {
    constructor(
        private readonly userService: UserManagementService,
        @Inject(TRANSPORT) private readonly client: ClientProxy
    ) { }

    @MessagePattern('resend-code')
    public async resendCode(@Payload() email: string) {
        try {
            return await this.userService.resendCodeForgotPass(email, this.client);
        } catch (error) {
            return error;
        }
    }
}