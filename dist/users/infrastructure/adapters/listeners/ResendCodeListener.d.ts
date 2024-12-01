import { ClientProxy } from "@nestjs/microservices";
import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class ResendCodeListener {
    private readonly userService;
    private readonly client;
    constructor(userService: UserManagementService, client: ClientProxy);
    resendCode(email: string): Promise<any>;
}
