import { User } from "src/users/domain/models/User";
import { GetByIdUseCase } from "src/users/domain/ports/in/GetByIdUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";
export declare class GetByIdUseCaseImpl implements GetByIdUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getById(uuid: string): Promise<User>;
}
