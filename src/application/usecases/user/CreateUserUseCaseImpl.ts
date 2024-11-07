import { UserDTO } from "src/domain/dtos/UserDTO";
import { CreateUserUseCase } from "src/domain/ports/in/user/CreateUserUseCase";
import { UserRepository } from "src/domain/ports/out/UserRepository";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class CreateUserUseCaseImpl implements CreateUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}

    public async createUser(user: UserDTO): Promise<string> {
        return await this.userRepository.createUser(user);
    }
}