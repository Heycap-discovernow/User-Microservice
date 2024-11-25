import { User } from "src/users/domain/models/User";

export interface GetByEmailUseCase {
    getByEmail(email: string): Promise<User>;
}