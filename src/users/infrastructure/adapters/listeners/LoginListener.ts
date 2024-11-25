import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UserManagementService } from "src/users/application/services/UserManagementService";

@Controller()
export class LoginListener {
    constructor(
        private readonly userService: UserManagementService,
    ) { }

    @MessagePattern("user-login")
    public async userLogin(@Payload() payload: { email: string, password: string }) {
        const { email, password } = payload;
        return await this.userService.loginUser(email, password);
    }
}