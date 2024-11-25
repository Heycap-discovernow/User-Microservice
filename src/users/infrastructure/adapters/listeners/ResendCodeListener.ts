import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { BuilderRequest } from "src/users/application/dtos/request/BuilderRequest";
import { UserManagementService } from "src/users/application/services/UserManagementService";

@Controller()
export class ResendCodeListener {
    constructor(
        private readonly userService: UserManagementService
    ) { }

    @MessagePattern('resend-code')
    public async resendCode(@Payload() email: string) {
        try {
            return await this.userService.resendCodeForgotPass(email);
        } catch (error) {
            return error;
        }
    }
}