import { Controller, Inject } from "@nestjs/common";
import { MessagePattern, Payload, ClientProxy } from "@nestjs/microservices";

import { TRANSPORT } from "src/config";

import { UserManagementService } from "src/users/application/services/UserManagementService";

@Controller()
export class LoginListener {
    constructor(
        private readonly userService: UserManagementService,
        @Inject(TRANSPORT) private readonly client: ClientProxy
    ) { }

    @MessagePattern("user-login")
    public async userLogin(@Payload() payload: { email: string, password: string }) {
        const { email, password } = payload;
        return await this.userService.loginUser(email, password, this.client);
    }
}