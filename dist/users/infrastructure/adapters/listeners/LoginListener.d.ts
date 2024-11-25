import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class LoginListener {
    private readonly userService;
    constructor(userService: UserManagementService);
    userLogin(payload: {
        email: string;
        password: string;
    }): Promise<string>;
}
