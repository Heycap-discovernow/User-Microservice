import { Injectable, Inject } from "@nestjs/common";

import { TokenService } from "src/users/application/services/TokenService";
import { User } from "src/users/domain/models/User";
import { LoginUserUseCase } from "src/users/domain/ports/in/LoginUserUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";

@Injectable()
export class LoginUserUseCaseImpl implements LoginUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository,
        private readonly tokenService: TokenService
    ){}

    public async login(email: string): Promise<User> {
        const user = await this.userRepository.getByEmail(email);
        
        return user
    }
}