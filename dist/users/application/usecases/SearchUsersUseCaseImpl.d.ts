import { User } from "src/users/domain/models/User";
import { SearchUsersUseCase } from "src/users/domain/ports/in/SearchUsersUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";
export declare class SearchUsersUseCaseImpl implements SearchUsersUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    searchUsers(text: string): Promise<User[]>;
}
