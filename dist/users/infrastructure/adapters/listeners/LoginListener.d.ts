import { ClientProxy } from "@nestjs/microservices";
import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class LoginListener {
    private readonly userService;
    private readonly client;
    constructor(userService: UserManagementService, client: ClientProxy);
    userLogin(payload: {
        email: string;
        password: string;
    }): Promise<string>;
}
