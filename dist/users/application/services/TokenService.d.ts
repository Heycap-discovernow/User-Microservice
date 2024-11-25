import { JwtPayload } from "jsonwebtoken";
import { UserDTO } from "src/users/domain/dtos/UserDTO";
export declare class TokenService {
    constructor();
    generateJwtLogin(user: UserDTO, code: string): string;
    generateJwtForgotPassword(user: UserDTO, code: string): string;
    decodeJwt(token: string): JwtPayload;
    generateCode(): string;
}
