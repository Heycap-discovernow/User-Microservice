import { ClientProxy } from "@nestjs/microservices";
import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class EmailForgotPasswordListener {
    private readonly userService;
    private readonly client;
    constructor(userService: UserManagementService, client: ClientProxy);
    searchEmailPassword(email: string): Promise<any>;
}
