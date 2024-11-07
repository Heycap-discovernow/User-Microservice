import { UserDTO } from "src/domain/dtos/UserDTO";

export interface UpdateUserUseCase {
    updateUser(uuid: string, user: UserDTO): Promise<string>;
}