import { UserDTO } from "src/users/domain/dtos/UserDTO";
import { UpdateUserUseCase } from "src/users/domain/ports/in/user/UpdateUserUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class UpdateUserUseCaseImpl implements UpdateUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}

    public async updateUser(uuid: string, user: UserDTO): Promise<string> {
        return await this.userRepository.updateUser(uuid, user);
    }
}