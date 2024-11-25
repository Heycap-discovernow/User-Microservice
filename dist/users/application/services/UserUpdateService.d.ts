import { UserSearchService } from "src/users/application/services/UserSearchService";
import { UpdateUserDTO } from "src/users/domain/dtos/UpdateUserDTO";
import { UpdateUserUseCase } from "src/users/domain/ports/in/UpdateUserUseCase";
export declare class UserUpdateService implements UpdateUserUseCase {
    private readonly updateUserUseCase;
    private readonly userSearchService;
    constructor(updateUserUseCase: UpdateUserUseCase, userSearchService: UserSearchService);
    updateUser(uuid: string, user: UpdateUserDTO): Promise<string>;
    changePassword(uuid: string, newPassword: string): Promise<string>;
}
