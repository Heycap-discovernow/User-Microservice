import { CreateUserUseCase } from "src/users/domain/ports/in/CreateUserUseCase";
import { CreateUserDTO } from "src/users/domain/dtos/CreateUserDTO";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";
export declare class CreateUserUseCaseImpl implements CreateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    createUser(data: CreateUserDTO): Promise<string>;
}
