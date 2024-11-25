import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class VerifyNumberListener {
    private readonly userService;
    constructor(userService: UserManagementService);
    verifyNumberListener(payload: {
        token: string;
        code: string;
    }): Promise<any>;
}
