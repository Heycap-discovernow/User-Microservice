import { Injectable, Inject } from "@nestjs/common";

import { DeleteUserUseCase } from "src/users/domain/ports/in/DeleteUserUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";

@Injectable()
export class DeleteUserUseCaseImpl implements DeleteUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}

    public async deleteUser(uuid: string): Promise<boolean> {
        return await this.userRepository.deleteUser(uuid);
    }
}