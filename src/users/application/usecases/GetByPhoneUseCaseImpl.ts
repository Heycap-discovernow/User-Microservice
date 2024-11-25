import { Injectable, Inject } from "@nestjs/common";

import { User } from "src/users/domain/models/User";
import { GetByPhoneUseCase } from "src/users/domain/ports/in/GetByPhoneUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";

@Injectable()
export class GetByPhoneUseCaseImpl implements GetByPhoneUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}

    public async getByPhone(phone: string): Promise<User> {
        return await this.userRepository.getByPhone(phone);
    }
}