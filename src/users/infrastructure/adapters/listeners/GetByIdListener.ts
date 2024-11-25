import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UserManagementService } from "src/users/application/services/UserManagementService";

@Controller()
export class GetByIdListener {
    constructor(
        private readonly userService: UserManagementService
    ) { }

    @MessagePattern('get-by-id-user')
    public async getById(@Payload() user_uuid: string) {
        return await this.userService.getUserById(user_uuid);
    }
}