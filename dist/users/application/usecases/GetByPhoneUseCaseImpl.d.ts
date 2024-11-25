import { User } from "src/users/domain/models/User";
import { GetByPhoneUseCase } from "src/users/domain/ports/in/GetByPhoneUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";
export declare class GetByPhoneUseCaseImpl implements GetByPhoneUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getByPhone(phone: string): Promise<User>;
}
