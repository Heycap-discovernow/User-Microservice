import { User } from "src/users/domain/models/User";
import { GetByIdUseCase } from "src/users/domain/ports/in/GetByIdUseCase";
import { GetByEmailUseCase } from "src/users/domain/ports/in/GetByEmailUseCase";
import { GetByNicknameUseCase } from "src/users/domain/ports/in/GetByNicknameUseCase";
import { GetByPhoneUseCase } from "src/users/domain/ports/in/GetByPhoneUseCase";
import { SearchUsersUseCase } from "src/users/domain/ports/in/SearchUsersUseCase";
export declare class UserSearchService implements GetByIdUseCase, GetByNicknameUseCase, GetByEmailUseCase, GetByPhoneUseCase, SearchUsersUseCase {
    private readonly getByIdUseCase;
    private readonly getByEmailUseCase;
    private readonly getByNicknameUseCase;
    private readonly getByPhoneUseCase;
    private readonly searchUsersUseCase;
    constructor(getByIdUseCase: GetByIdUseCase, getByEmailUseCase: GetByEmailUseCase, getByNicknameUseCase: GetByNicknameUseCase, getByPhoneUseCase: GetByPhoneUseCase, searchUsersUseCase: SearchUsersUseCase);
    getById(uuid: string): Promise<User>;
    getByNickname(nickname: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
    getByPhone(phone: string): Promise<User>;
    searchUsers(text: string): Promise<User[]>;
}
