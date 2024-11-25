import { UpdateUserDTO } from "src/users/domain/dtos/UpdateUserDTO";

export interface UpdateUserUseCase {
    updateUser(uuid: string, user: UpdateUserDTO): Promise<string>;
}