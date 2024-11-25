import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class ResendCodeListener {
    private readonly userService;
    constructor(userService: UserManagementService);
    resendCode(email: string): Promise<any>;
}
