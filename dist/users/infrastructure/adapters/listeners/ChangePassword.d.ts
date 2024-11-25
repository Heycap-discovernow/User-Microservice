import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class ChangePasswordListener {
    private readonly userService;
    constructor(userService: UserManagementService);
    changePassword(payload: {
        token: string;
        newPassword: string;
    }): Promise<any>;
}
