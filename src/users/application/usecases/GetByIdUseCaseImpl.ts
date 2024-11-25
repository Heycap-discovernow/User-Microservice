import { Injectable, Inject } from "@nestjs/common";

import { User } from "src/users/domain/models/User";
import { GetByIdUseCase } from "src/users/domain/ports/in/GetByIdUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";

@Injectable()
export class GetByIdUseCaseImpl implements GetByIdUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}

    public async getById(uuid: string): Promise<User> {
        return await this.userRepository.getById(uuid);
    }
}