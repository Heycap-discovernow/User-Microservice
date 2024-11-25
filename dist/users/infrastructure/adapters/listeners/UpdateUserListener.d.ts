import { UserManagementService } from "src/users/application/services/UserManagementService";
import { UpdateUserDTO } from "src/users/domain/dtos/UpdateUserDTO";
export declare class UpdateUserListener {
    private readonly userService;
    constructor(userService: UserManagementService);
    updateUser(payload: {
        token: string;
        newFields: UpdateUserDTO;
    }): Promise<string>;
}
