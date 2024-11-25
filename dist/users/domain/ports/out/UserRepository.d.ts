import { UserDTO } from "src/users/domain/dtos/UserDTO";
import { UpdateUserDTO } from "src/users/domain/dtos/UpdateUserDTO";
import { User } from "src/users/domain/models/User";
export interface UserRepository {
    getById(uuid: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
    getByNickname(nickname: string): Promise<User>;
    getByPhone(phone: string): Promise<User>;
    searchUsers(contain: string): Promise<User[]>;
    createUser(user: UserDTO): Promise<string>;
    updateUser(uuid: string, user: UpdateUserDTO): Promise<string>;
    updatePassword(password: string): Promise<string>;
    deleteUser(uuid: string): Promise<boolean>;
}
