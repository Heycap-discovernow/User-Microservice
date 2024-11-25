import { User } from "src/users/domain/models/User";
import { GetByEmailUseCase } from "src/users/domain/ports/in/GetByEmailUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";
export declare class GetByEmailUseCaseImpl implements GetByEmailUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getByEmail(email: string): Promise<User>;
}
