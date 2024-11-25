import { Controller, Inject } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UserManagementService } from "src/users/application/services/UserManagementService";

@Controller()
export class VerifyCodeForgotPasswordListener {
    constructor(
        private readonly userService: UserManagementService
    ) { }

    @MessagePattern('forgot-verify-code')
    public async verifyCode(@Payload() payload: { code: string, user_uuid: string }) { //Posiblemente ya no sea necesario este listener
        // const { code, user_uuid } = payload;
        // await this.userService.verifyCodeForgot(user_uuid, code);
    }
}