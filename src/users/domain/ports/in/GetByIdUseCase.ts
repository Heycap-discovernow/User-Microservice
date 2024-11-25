import { User } from "src/users/domain/models/User";

export interface GetByIdUseCase {
    getById(uuid: string): Promise<User>;
}