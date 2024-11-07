import { UserDTO } from "src/domain/dtos/UserDTO";

export interface CreateUserUseCase {
    createUser(user: UserDTO): Promise<string>;
}