import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UserRequest } from "src/users/application/dtos/request/UserRequest";
import { UserService } from "src/users/application/services/UserService";

@Controller()
export class CreateUserListenerController {
    constructor(
        private readonly userService: UserService
    ){}

    @MessagePattern('create-user') //this is the chanel for the message travel
    public async createUser(@Payload() user: UserRequest) {
        return this.userService.createUser(user);
    }
}