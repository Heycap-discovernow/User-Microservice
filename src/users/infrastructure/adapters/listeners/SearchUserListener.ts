import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UserManagementService } from "src/users/application/services/UserManagementService";

@Controller()
export class SearchUserListener {
    constructor(
        private readonly userService: UserManagementService
    ) { }

    @MessagePattern('search-user')
    public async searchUser(@Payload() text: string) {
        try {
            return await this.userService.searchUsers(text);
        } catch (error) {
            return error;
        }
    }
}