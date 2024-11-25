import { User } from "src/users/domain/models/User";

export interface SearchUsersUseCase {
    searchUsers(text: string): Promise<User[]>;
}