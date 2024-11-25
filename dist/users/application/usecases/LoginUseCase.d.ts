import { TokenService } from "src/users/application/services/TokenService";
import { User } from "src/users/domain/models/User";
import { LoginUserUseCase } from "src/users/domain/ports/in/LoginUserUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";
export declare class LoginUserUseCaseImpl implements LoginUserUseCase {
    private readonly userRepository;
    private readonly tokenService;
    constructor(userRepository: UserRepository, tokenService: TokenService);
    login(email: string): Promise<User>;
}
