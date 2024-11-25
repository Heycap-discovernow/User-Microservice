import { UserDTO } from "src/users/domain/dtos/UserDTO";
import { CreateUserUseCase } from "src/users/domain/ports/in/user/CreateUserUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";

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