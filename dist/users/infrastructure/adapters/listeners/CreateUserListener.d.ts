import { UserRequest } from "src/users/application/dtos/request/UserRequest";
import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class CreateUserListener {
    private readonly userService;
    constructor(userService: UserManagementService);
    createUser(user: UserRequest): Promise<any>;
}
