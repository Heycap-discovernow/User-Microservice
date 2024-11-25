import { User } from "src/users/domain/models/User";

export interface GetByNicknameUseCase {
    getByNickname(nickname: string): Promise<User>;
}