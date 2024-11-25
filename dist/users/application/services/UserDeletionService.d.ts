import { DeleteUserUseCase } from "src/users/domain/ports/in/DeleteUserUseCase";
export declare class UserDeletionService implements DeleteUserUseCase {
    private readonly deleteUserUseCase;
    constructor(deleteUserUseCase: DeleteUserUseCase);
    deleteUser(uuid: string): Promise<boolean>;
}
