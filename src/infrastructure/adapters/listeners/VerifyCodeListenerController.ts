import { Controller, Inject } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UserService } from "src/application/services/UserService";

@Controller()
export class VerifyCodeListenerController {
    constructor(
        private readonly userService: UserService
    ){}

    @MessagePattern('verify-code')
    public async verifyCode(@Payload() user_uuid: string, code: string) {
        await this.userService.verifyPhone(user_uuid, code);
    }
}