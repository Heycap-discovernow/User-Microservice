import { Injectable, Inject } from "@nestjs/common";

import { User } from "src/users/domain/models/User";
import { GetByEmailUseCase } from "src/users/domain/ports/in/GetByEmailUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";

@Injectable()
export class GetByEmailUseCaseImpl implements GetByEmailUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}

    public async getByEmail(email: string): Promise<User> {
        return await this.userRepository.getByEmail(email);
    }
}