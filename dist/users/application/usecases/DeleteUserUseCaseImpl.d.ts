import { DeleteUserUseCase } from "src/users/domain/ports/in/DeleteUserUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";
export declare class DeleteUserUseCaseImpl implements DeleteUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    deleteUser(uuid: string): Promise<boolean>;
}
