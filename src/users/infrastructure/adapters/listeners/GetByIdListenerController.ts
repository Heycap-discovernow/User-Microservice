import { AccessTokenAuthGuard } from "src/users/infrastructure/guards/AccesTokenAuthGuard";
import { UserService } from "src/users/application/services/UserService";

import { Controller, UseGuards } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class GetByIdListenerController {
    constructor(
        private readonly userService: UserService
    ){}

    @UseGuards(AccessTokenAuthGuard)
    @MessagePattern('get-by-id-user')
    public async getById(@Payload() user_uuid: string) {
        return await this.userService.getById(user_uuid);
    }
}