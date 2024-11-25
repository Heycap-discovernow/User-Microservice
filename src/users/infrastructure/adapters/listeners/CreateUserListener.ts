import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UserRequest } from "src/users/application/dtos/request/UserRequest";
import { UserManagementService } from "src/users/application/services/UserManagementService";

@Controller()
export class CreateUserListener {
    constructor(
        private readonly userService: UserManagementService
    ) { }

    @MessagePattern('create-user') //this is the chanel for the message travel
    public async createUser(@Payload() user: UserRequest) {
        try {
            return this.userService.createUser(user);
        } catch (error) {
            return error;
        }
    }
}