import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class EmailForgotPasswordListener {
    private readonly userService;
    constructor(userService: UserManagementService);
    searchEmailPassword(email: string): Promise<any>;
}
