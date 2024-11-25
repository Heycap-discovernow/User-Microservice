import { Injectable, Inject } from "@nestjs/common";

import { User } from "src/users/domain/models/User";
import { SearchUsersUseCase } from "src/users/domain/ports/in/SearchUsersUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";

@Injectable()
export class SearchUsersUseCaseImpl implements SearchUsersUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ) { }

    public async searchUsers(text: string): Promise<User[]> {
        return await this.userRepository.searchUsers(text);
    }
}