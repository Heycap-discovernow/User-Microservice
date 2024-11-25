import { User } from "src/users/domain/models/User";

export interface GetByPhoneUseCase {
    getByPhone(phone: string): Promise<User>;
}