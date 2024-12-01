import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UserManagementService } from "src/users/application/services/UserManagementService";

@Controller()
export class GetByIdListener {
    constructor(
        private readonly userService: UserManagementService
    ) { }

    @MessagePattern('get-user-by-id')
    public async getById(@Payload() user_uuid: string) {
        try {
            return await this.userService.getUserById(user_uuid);
        } catch (error) {
            return error;
        }
    }
}