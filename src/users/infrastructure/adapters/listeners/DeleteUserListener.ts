import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UserManagementService } from "src/users/application/services/UserManagementService";

@Controller()
export class DeletUserListener {
    constructor(
        private readonly userService: UserManagementService
    ) { }

    @MessagePattern('delete-user')
    public async deleteUser(@Payload() token: string) {
        try {
            return await this.userService.deleteUser(token);
        } catch (error) {
            return error;
        }
    }
}