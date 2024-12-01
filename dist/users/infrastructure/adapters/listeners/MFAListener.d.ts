import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class MFAListener {
    private readonly userService;
    constructor(userService: UserManagementService);
    changePassword(payload: {
        code: string;
        user_uuid: string;
        type: string;
    }): Promise<any>;
}
