import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class UpdatePasswordListener {
    private readonly userService;
    constructor(userService: UserManagementService);
    updatePassword(payload: {
        token: string;
        newPassword: string;
    }): Promise<any>;
}
