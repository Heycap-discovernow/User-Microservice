import { User } from "src/users/domain/models/User";
import { LoginUserUseCase } from "src/users/domain/ports/in/LoginUserUseCase";
export declare class UserLoginService implements LoginUserUseCase {
    private readonly loginUserUseCase;
    constructor(loginUserUseCase: LoginUserUseCase);
    login(email: string, password: string): Promise<User>;
    verifyPhone(uuid: string, code: string): Promise<boolean>;
}
