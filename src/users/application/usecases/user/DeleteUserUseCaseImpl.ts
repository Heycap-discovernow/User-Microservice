import { UserDTO } from "src/users/domain/dtos/UserDTO";
import { DeleteUserUseCase } from "src/users/domain/ports/in/user/DeleteUserUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class DeleteUserUseCaseImpl implements DeleteUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}

    public async deleteUser(uuid: string): Promise<boolean> {
        return await this.userRepository.deleteUser(uuid);
    }
}