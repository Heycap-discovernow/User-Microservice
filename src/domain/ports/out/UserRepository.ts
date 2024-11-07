import { UserDTO } from "src/domain/dtos/UserDTO";

export interface UserRepository {
    getById(uuid: string): Promise<UserDTO>;
    getByEmail(email: string): Promise<UserDTO>;
    createUser(user: UserDTO): Promise<string>;
    updateUser(uuid: string, user: UserDTO): Promise<string>;
    deleteUser(uuid: string): Promise<boolean>;
}