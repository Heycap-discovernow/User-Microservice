import { UpdateUserDTO } from "src/users/domain/dtos/UpdateUserDTO";
import { UpdateUserUseCase } from "src/users/domain/ports/in/UpdateUserUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";
export declare class UpdateUserUseCaseImpl implements UpdateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    updateUser(uuid: string, user: UpdateUserDTO): Promise<string>;
}
