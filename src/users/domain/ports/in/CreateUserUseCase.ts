import { CreateUserDTO } from "src/users/domain/dtos/CreateUserDTO";

export interface CreateUserUseCase {
    createUser(user: CreateUserDTO): Promise<string>;
}