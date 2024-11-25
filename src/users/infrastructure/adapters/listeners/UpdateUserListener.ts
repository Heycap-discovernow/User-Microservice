import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UserManagementService } from "src/users/application/services/UserManagementService";
import { UpdateUserDTO } from "src/users/domain/dtos/UpdateUserDTO";

@Controller()
export class UpdateUserListener {
    constructor(
        private readonly userService: UserManagementService
    ) { }

    @MessagePattern('update-user')
    public async updateUser(@Payload() payload: { token: string, newFields: UpdateUserDTO }) {
        const { token, newFields } = payload;
        return this.userService.updateUser(token, newFields);
    }
}