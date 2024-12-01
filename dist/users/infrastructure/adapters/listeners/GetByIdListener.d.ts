import { UserManagementService } from "src/users/application/services/UserManagementService";
export declare class GetByIdListener {
    private readonly userService;
    constructor(userService: UserManagementService);
    getById(user_uuid: string): Promise<any>;
}
