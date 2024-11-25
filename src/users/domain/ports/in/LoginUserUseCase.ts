import { User } from "src/users/domain/models/User";

export interface LoginUserUseCase {
    login(email: string, password: string): Promise<User>;
}