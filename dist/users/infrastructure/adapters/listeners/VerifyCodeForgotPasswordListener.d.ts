import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class VerifyCodeForgotPasswordListener {
    private readonly userService;
    constructor(userService: UserManagementService);
    verifyCode(payload: {
        code: string;
        user_uuid: string;
    }): Promise<void>;
}
