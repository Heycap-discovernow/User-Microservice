import { UserDTO } from "src/domain/dtos/UserDTO";
import { LoginUserUseCase } from "src/domain/ports/in/user/LoginUserUseCase";
import { UserRepository } from "src/domain/ports/out/UserRepository";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class LoginUserUseCaseImpl implements LoginUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}

    public async login(email: string): Promise<UserDTO> {
        return await this.userRepository.getByEmail(email);
    }
}