import { Injectable, Inject } from "@nestjs/common";

import { User } from "src/users/domain/models/User";
import { GetByIdUseCase } from "src/users/domain/ports/in/GetByIdUseCase";
import { GetByEmailUseCase } from "src/users/domain/ports/in/GetByEmailUseCase";
import { GetByNicknameUseCase } from "src/users/domain/ports/in/GetByNicknameUseCase";
import { GetByPhoneUseCase } from "src/users/domain/ports/in/GetByPhoneUseCase";
import { SearchUsersUseCase } from "src/users/domain/ports/in/SearchUsersUseCase";

@Injectable()
export class UserSearchService implements GetByIdUseCase, GetByNicknameUseCase, GetByEmailUseCase, GetByPhoneUseCase, SearchUsersUseCase {
    constructor(
        @Inject('GetByIdUseCase') private readonly getByIdUseCase: GetByIdUseCase,
        @Inject('GetByEmailUseCase') private readonly getByEmailUseCase: GetByEmailUseCase,
        @Inject('GetByNicknameUseCase') private readonly getByNicknameUseCase: GetByNicknameUseCase,
        @Inject('GetByPhoneUseCase') private readonly getByPhoneUseCase: GetByPhoneUseCase,
        @Inject("SearchUsersUseCase") private readonly searchUsersUseCase: SearchUsersUseCase
    ) { }

    public async getById(uuid: string): Promise<User> {
        return await this.getByIdUseCase.getById(uuid).catch(() => { return null });
    }

    public async getByNickname(nickname: string): Promise<User> {
        return await this.getByNicknameUseCase.getByNickname(nickname).catch(() => { return null });
    }

    public async getByEmail(email: string): Promise<User> {
        return await this.getByEmailUseCase.getByEmail(email).catch(() => { return null });
    }

    public async getByPhone(phone: string): Promise<User> {
        return await this.getByPhoneUseCase.getByPhone(phone).catch(() => { return null });
    }

    public async searchUsers(text: string): Promise<User[]> {
        return await this.searchUsersUseCase.searchUsers(text).catch(() => { return [] });
    }
}