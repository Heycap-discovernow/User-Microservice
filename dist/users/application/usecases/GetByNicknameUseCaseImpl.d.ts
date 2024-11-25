import { User } from "src/users/domain/models/User";
import { GetByNicknameUseCase } from "src/users/domain/ports/in/GetByNicknameUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";
export declare class GetByNicknameUseCaseImpl implements GetByNicknameUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getByNickname(nickname: string): Promise<User>;
}
