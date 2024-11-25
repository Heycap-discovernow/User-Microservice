import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class MFAListener {
    private readonly userService;
    constructor(userService: UserManagementService);
    changePassword(payload: {
        token: string;
        code: string;
    }): Promise<any>;
}
