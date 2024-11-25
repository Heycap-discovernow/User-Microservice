import { UserDTO } from "src/users/domain/dtos/UserDTO";

export interface CreateUserUseCase {
    createUser(user: UserDTO): Promise<string>;
}