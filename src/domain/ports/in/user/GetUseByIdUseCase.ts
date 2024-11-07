import { UserDTO } from "src/domain/dtos/UserDTO";

export interface GetUserByIdUseCase {
    getById(uuid: string): Promise<UserDTO>;
}