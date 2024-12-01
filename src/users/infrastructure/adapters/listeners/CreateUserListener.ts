import { Controller, Inject } from "@nestjs/common";
import { MessagePattern, Payload, ClientProxy } from "@nestjs/microservices";

import { TRANSPORT } from "src/config";

import { UserRequest } from "src/users/application/dtos/request/UserRequest";
import { UserManagementService } from "src/users/application/services/UserManagementService";

@Controller()
export class CreateUserListener {
    constructor(
        private readonly userService: UserManagementService,
        @Inject(TRANSPORT) private readonly client: ClientProxy
    ) { }

    @MessagePattern('create-user') //this is the chanel for the message travel
    public async createUser(@Payload() user: UserRequest) {
        try {
            return this.userService.createUser(user, this.client);
        } catch (error) {
            return error;
        }
    }
}