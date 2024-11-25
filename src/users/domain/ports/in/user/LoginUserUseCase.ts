import { UserDTO } from "src/users/domain/dtos/UserDTO";

export interface LoginUserUseCase {
    login(email: string, password: string): Promise<UserDTO>;
}