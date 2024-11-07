import { UserDTO } from "src/domain/dtos/UserDTO";

export interface LoginUserUseCase {
    login(email: string, password: string): Promise<UserDTO>;
}