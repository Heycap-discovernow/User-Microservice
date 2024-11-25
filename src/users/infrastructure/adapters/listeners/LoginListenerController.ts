import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UserService } from "src/users/application/services/UserService";

@Controller()
export class LoginListenerController {
    constructor(
        private readonly userService: UserService
    ){}

    @MessagePattern("user-login")
    public async userLogin(@Payload() email: string, password: string) {
        return this.userService.login(email, password);
    }
}