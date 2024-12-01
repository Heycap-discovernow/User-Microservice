import { ClientProxy } from "@nestjs/microservices";
import { UserRequest } from "src/users/application/dtos/request/UserRequest";
import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class CreateUserListener {
    private readonly userService;
    private readonly client;
    constructor(userService: UserManagementService, client: ClientProxy);
    createUser(user: UserRequest): Promise<any>;
}
