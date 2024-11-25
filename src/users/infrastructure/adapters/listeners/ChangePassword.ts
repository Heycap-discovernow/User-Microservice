import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UserManagementService } from "src/users/application/services/UserManagementService";

@Controller()
export class ChangePasswordListener {
    constructor(
        private readonly userService: UserManagementService
    ) { }

    @MessagePattern('change-password')
    public async changePassword(@Payload() payload: { token: string, newPassword: string }) {
        try {
            const { token, newPassword } = payload;
            return await this.userService.changePassword(token, newPassword);
        } catch (error) {
            return error;
        }
    }
}