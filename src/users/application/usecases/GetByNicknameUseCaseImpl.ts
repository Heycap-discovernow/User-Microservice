import { Injectable, Inject } from "@nestjs/common";

import { User } from "src/users/domain/models/User";
import { GetByNicknameUseCase } from "src/users/domain/ports/in/GetByNicknameUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";

@Injectable()
export class GetByNicknameUseCaseImpl implements GetByNicknameUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}

    public async getByNickname(nickname: string): Promise<User> {
        return await this.userRepository.getByNickname(nickname);
    }
}