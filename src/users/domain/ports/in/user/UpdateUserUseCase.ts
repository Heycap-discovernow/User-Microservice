import { UserDTO } from "src/users/domain/dtos/UserDTO";

export interface UpdateUserUseCase {
    updateUser(uuid: string, user: UserDTO): Promise<string>;
}