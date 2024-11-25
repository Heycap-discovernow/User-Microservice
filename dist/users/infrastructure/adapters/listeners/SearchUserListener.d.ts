import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class SearchUserListener {
    private readonly userService;
    constructor(userService: UserManagementService);
    searchUser(text: string): Promise<any>;
}
