import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class DeletUserListener {
    private readonly userService;
    constructor(userService: UserManagementService);
    deleteUser(token: string): Promise<any>;
}
