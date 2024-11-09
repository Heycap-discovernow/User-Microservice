import { UserDTO } from "src/users/domain/dtos/UserDTO";

export interface GetUserByIdUseCase {
    getById(uuid: string): Promise<UserDTO>;
}